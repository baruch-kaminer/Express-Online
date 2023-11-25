import dal from "../2-utils/dal";
import CategoryModel from "../4-models/category-model";



async function getCategories(): Promise<CategoryModel[]> {
    const sql = `SELECT * FROM categories`;
    const categories = await dal.execute( sql, [] );
    return categories;
}

export default{
    getCategories
}