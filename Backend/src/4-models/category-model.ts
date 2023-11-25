
class CategoryModel{

    public categoryId: number;
    public categoryName: string;

    public constructor(category: CategoryModel){
        this.categoryId = category.categoryId;
        this.categoryName = category.categoryName;

    }
}

export default CategoryModel;