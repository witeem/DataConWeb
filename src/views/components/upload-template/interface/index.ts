export interface UploadTempProps {
	loadFiles: () => any[];
}

export interface UploadDataType {
	serial: number;
	fileName: string;
	fileSize: number;
	filePath: string;
}
