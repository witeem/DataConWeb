import { useEffect, useImperativeHandle, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
// import { UploadProps } from "antd";
import { Upload, message } from "antd";
import { UploadApi } from "@/api/modules/upload";
const { Dragger } = Upload;

const UploadTemp = (params: any) => {
	const { subDirectory, uploadSerial } = params;
	const [uploadFileList, setUploadFiles] = useState<any>([]);
	const [isFinished, setIsFinished] = useState<boolean>(false);
	// const props: UploadProps = {
	// 	name: "formFiles",
	// 	multiple: true,
	// 	action: `${baseURL}${Voucher}/File/Upload`,
	// 	data: { subDirectory: subDirectory, uploadSerial: uploadSerial },
	// 	onChange(info) {
	// 		const { status } = info.file;
	// 		if (status !== "uploading") {
	// 			// console.log(info.file, info.fileList);
	// 		}
	// 		if (status === "done") {
	// 			message.success(`${info.file.name} file uploaded successfully.`);
	// 			let doneNum = 0;
	// 			info.fileList.forEach(item => {
	// 				if (item.status === "done") {
	// 					doneNum += 1;
	// 				}
	// 			});

	// 			if (info.fileList.length === doneNum) {
	// 				let list = info.fileList.map(file => {
	// 					return file.response.data;
	// 				});
	// 				setUploadFiles(list);
	// 				setIsFinished(true);
	// 			}
	// 		} else if (status === "error") {
	// 			message.error(`${info.file.name} file upload failed.`);
	// 		}
	// 	},
	// 	onDrop(e) {
	// 		console.log("Dropped files", e.dataTransfer.files);
	// 	}
	// };

	const handleUpload = async (options: any) => {
		console.log("上传成功", options);
	};

	const beforeUpload = async (file: any, fileList: any[]) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("subDirectory", subDirectory); // 添加额外的 body 参数
		formData.append("uploadSerial", uploadSerial); // 添加额外的 body 参数
		const { data } = await UploadApi(formData);
		console.log("上传成功", data);
		console.log("上传成功", fileList);
	};

	const handleChange = (info: any) => {
		const { status } = info.file;
		if (status !== "uploading") {
			// console.log(info.file, info.fileList);
		}
		if (status === "done") {
			message.success(`${info.file.name} file uploaded successfully.`);
			let doneNum = 0;
			info.fileList.forEach((item: any) => {
				if (item.status === "done") {
					doneNum += 1;
				}
			});

			console.log(doneNum);
		}
	};

	const loadFiles = () => {
		if (isFinished) {
			return uploadFileList;
		} else {
			message.warning("Please finish uploading");
		}
	};

	// 将子组件中需要调用的方法绑定到 ref
	useImperativeHandle(params.innerRef, () => ({
		loadFiles
	}));

	useEffect(() => {
		setUploadFiles([]);
		setIsFinished(false);
	}, []);

	return (
		<Dragger customRequest={handleUpload} beforeUpload={beforeUpload} multiple withCredentials onChange={handleChange}>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			<p className="ant-upload-text">Click or drag file to this area to upload</p>
			<p className="ant-upload-hint">
				Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
			</p>
		</Dragger>
	);
};

export default UploadTemp;
