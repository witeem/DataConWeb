/* eslint-disable @typescript-eslint/no-unused-vars */
import ProTable, { ActionType } from "@ant-design/pro-table";
import { useEffect, useRef, useState } from "react";
import { TableListPagination } from "./tablelist";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";

const SuperTable = (props: any) => {
	const { t } = useTranslation();
	const actionRef = useRef<ActionType>();
	const [selectedRowsState, setSelectedRows] = useState<any[]>([]);
	const [tableHeight, setTableHeight] = useState(433); // 表格高度，默认值大约显示10行
	const [tableParams, setTableParams] = useState<TableListPagination>({
		current: 1,
		pageSize: 10,
		total: 0
	});

	const loadTable = async () => {
		actionRef.current!.reload();
	};

	useEffect(() => {
		const searchHeight = document.getElementsByClassName("ant-pro-table-search")[0]?.clientHeight || 0;
		const headerHeight = document.getElementsByClassName("ant-layout-header")[0]?.clientHeight || 0;
		const contentHeight = document.getElementsByClassName("ant-layout-content")[0]?.clientHeight || 0;
		setTableHeight(contentHeight - headerHeight - searchHeight - 40);
	}, [document.getElementsByClassName("ant-layout-content")[0]?.clientHeight]);

	useEffect(() => {
		if (props.reload) {
			loadTable();
		}
	}, [props.reload]);

	return (
		<ProTable<any, TableListPagination>
			tableStyle={{ height: tableHeight }}
			scroll={props?.scroll || false}
			headerTitle={props.title}
			bordered={true}
			request={props.fetchData}
			actionRef={actionRef}
			columns={props.columns}
			rowKey={props.rowKey}
			rowSelection={
				props?.rowSelection === undefined
					? false
					: {
							onChange: (_, selectedRows) => {
								setSelectedRows(selectedRows);
							}
					  }
			}
			pagination={{
				showQuickJumper: true,
				showSizeChanger: true,
				defaultPageSize: tableParams.pageSize,
				onShowSizeChange: (page, pageSize) => {
					setTableParams({ ...tableParams, current: page, pageSize });
				},
				onChange: (page, pageSize) => {
					setTableParams({ ...tableParams, current: page, pageSize });
				}
			}}
			toolBarRender={
				props?.toolBarRender === undefined
					? () => {
							return [];
					  }
					: props.toolBarRender
			}
			search={
				props.search === true
					? {
							optionRender: ({ searchText }, { form }) => {
								return [
									<Button
										shape="round"
										className="btn-ripple"
										type="primary"
										key="reset"
										icon={<RedoOutlined />}
										onClick={() => {
											form?.resetFields();
											form?.submit();
										}}
									>
										{t("opt.reset")}
									</Button>,
									<Button
										shape="round"
										className="btn-ripple"
										type="primary"
										key="submit"
										icon={<SearchOutlined />}
										onClick={() => {
											form?.submit();
										}}
									>
										{t("opt.search")}
									</Button>
								];
							}
					  }
					: false
			}
		/>
	);
};

export default SuperTable;
