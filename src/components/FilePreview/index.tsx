import { Image } from "antd";
import { useState } from "react";
import { Document, Page } from "react-pdf";

const FilePreview = (props: any) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	const onDocumentLoadSuccess = (numPage: any) => {
		setNumPages(numPage);
		setPageNumber(numPage);
	};

	const fileExtension = () => {
		switch (props.fileExtension) {
			case ".pdf":
				return (
					<div>
						<Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
							<Page pageNumber={pageNumber} />
						</Document>
						<p>
							Page {pageNumber} of {numPages}
						</p>
					</div>
				);
			case ".jpg":
			case ".png":
			case ".gif":
			case ".bmp":
			case ".jpeg":
			case ".JPG":
			case ".JPEG":
			case ".PNG":
			case ".GIF":
			case ".BMP":
				return (
					<Image
						height={100}
						src={props.src}
						preview={{
							src: props.src
						}}
					/>
				);
			default:
				return <a href={props.src}></a>;
		}
	};

	return fileExtension();
};
export default FilePreview;
