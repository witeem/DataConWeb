import { RouteComponentProps } from "react-router-dom";

export interface MetaProps {
	keepAlive?: boolean;
	requiresAuth?: boolean;
	title: string;
	key?: string;
}

export interface RouteObject extends RouteComponentProps {
	caseSensitive?: boolean;
	children?: RouteObject[];
	element?: React.ReactNode;
	index?: boolean;
	path?: string;
	meta?: MetaProps;
	isLink?: string;
}
