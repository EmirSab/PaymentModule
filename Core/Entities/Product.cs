namespace Core.Entities
{
    public class Product : BaseEntity
    {
        #region 2.10 Adding a model ->Data/StoreContext
        // 3.24.1 Deleting the id and inheritance adding more properties ->ProductBrand
        //public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public ProductType ProductType { get; set; }
        public int ProductTypeId { get; set; }
        public ProductBrand ProductBrand { get; set; }
        public int ProductBrandId { get; set; }
        #endregion
    }
}