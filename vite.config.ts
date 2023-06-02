import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";
import viteCompression from "vite-plugin-compression";
import eslintPlugin from "vite-plugin-eslint";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// @see: https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
	const env = loadEnv(mode.mode, process.cwd());
	const viteEnv = wrapperEnv(env);

	return {
		base: "./",
		// alias config
		resolve: {
			alias: [
				{
					find: "@",
					replacement: path.resolve(__dirname, "src")
				},
				{
					find: "src",
					replacement: path.resolve(__dirname, "src")
				}
			],
			extensions: [".js", ".json", ".ts", ".tsx", ".jsx", ".less"]
		},
		// global css
		css: {
			preprocessorOptions: {
				less: {
					// modifyVars: {
					// 	"primary-color": "#1DA57A",
					// },
					javascriptEnabled: true,
					additionalData: `@import "@/styles/var.less";`
				}
			}
		},
		// server config
		server: {
			host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			https: false,
			// Proxy cross-domain (mock doesn't need configuration, it's just a event column)
			proxy: {
				"/api": {
					target: "http://127.0.0.1:5188", // easymock
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "/api")
				}
			}
		},
		// plugins
		plugins: [
			react(),
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE
					}
				}
			}),
			// * 使用 svg 图标
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), "src/assets/icons", "srcassetsimages")],
				symbolId: "icon-[dir]-[name]"
			}),
			// * EsLint displays error messages on the browser interface
			eslintPlugin(),
			// * Whether to generate a package preview
			viteEnv.VITE_REPORT && visualizer(),
			// * gzip compress
			viteEnv.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: "gzip",
					ext: ".gz"
				})
		],
		esbuild: {
			supported: {
				"top-level-await": true //browsers can handle top-level-await features
			},
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
		// build configure
		build: {
			target: "esnext", //browsers can handle the latest ES features
			outDir: "dist",
			// esbuild Packing is faster, but it does not remove console.log, which uses terser mode
			// minify: "esbuild",
			minify: "terser",
			terserOptions: {
				compress: {
					drop_console: viteEnv.VITE_DROP_CONSOLE,
					drop_debugger: true
				}
			},
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		}
	};
});
