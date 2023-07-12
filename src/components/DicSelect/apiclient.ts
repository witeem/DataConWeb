import { GetDictionariesPageApi } from "@/api/modules/dictionaries";

export async function getDictionariesList(params: string): Promise<any[]> {
	const dictionariesRes = await GetDictionariesPageApi({ isPage: false, dataType: params });
	if (dictionariesRes.success === false) {
		return [];
	}

	let dicList = dictionariesRes.data.map((item: any) => {
		return {
			value: item.dataKey,
			label: item.dataValue
		};
	});

	return dicList;
}
