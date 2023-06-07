import { GetTradeCategoryPageApi } from "@/api/modules/outlet";

export function getLevelList(): any[] {
	let levels = [];
	for (let index = 3; index > 0; index--) {
		levels.push({
			value: "B" + index,
			label: "B" + index
		});
	}

	for (let index = 1; index <= 10; index++) {
		levels.push({
			value: prefixZero(index, 2),
			label: prefixZero(index, 2)
		});
	}

	return levels;
}

export function getZoneList(): any[] {
	let zones = [
		{
			value: "CASINO",
			label: "CASINO"
		},
		{
			value: "GCN",
			label: "GCN"
		},
		{
			value: "GCS",
			label: "GCS"
		},
		{
			value: "PRC",
			label: "PRC"
		},
		{
			value: "PRN",
			label: "PRN"
		},
		{
			value: "PRS",
			label: "PRS"
		},
		{
			value: "SPG",
			label: "SPG"
		},
		{
			value: "HOTELLOBBY",
			label: "HOTELLOBBY"
		}
	];
	return zones;
}

export async function getTenantCategorys(): Promise<any[]> {
	const categories = await GetTradeCategoryPageApi({ isPage: false });
	if (categories.success === false) {
		return [];
	}

	let categoryList = categories.data.map((item: any) => {
		return {
			value: item.id,
			label: item.category
		};
	});

	return categoryList;
}

export function prefixZero(n: number, m: number) {
	let _a = (Array(m).join("0") + n).slice(-m);
	return _a;
}
