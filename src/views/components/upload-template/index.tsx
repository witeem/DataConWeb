import { useEffect, useImperativeHandle, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
// import { UploadProps } from "antd";
import { Upload, UploadProps, message } from "antd";
import { Voucher } from "@/api/config/servicePort";
const { Dragger } = Upload;
let baseURL = import.meta.env.VITE_API_URL as string;

const UploadTemp = (params: any) => {
	const { subDirectory, uploadSerial } = params;
	const [uploadFileList, setUploadFiles] = useState<any>([]);
	const [isFinished, setIsFinished] = useState<boolean>(false);
	const props: UploadProps = {
		name: "formFiles",
		multiple: true,
		withCredentials: true,
		action: `${baseURL}${Voucher}/File/Upload`,
		data: { subDirectory: subDirectory, uploadSerial: uploadSerial },
		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				// console.log(info.file, info.fileList);
			}
			if (status === "done") {
				message.success(`${info.file.name} file uploaded successfully.`);
				let doneNum = 0;
				info.fileList.forEach(item => {
					if (item.status === "done") {
						doneNum += 1;
					}
				});

				if (info.fileList.length === doneNum) {
					let list = info.fileList.map(file => {
						return file.response.data;
					});
					setUploadFiles(list);
					setIsFinished(true);
				}
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
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

	useEffect(() => {}, []);

	return (
		<Dragger {...props}>
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
