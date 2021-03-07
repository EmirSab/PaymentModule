namespace API.Dtos
{
    #region 4.42 Add Dto, class and properties -> ProductsController
    public class ProductToReturnDto
    {
        //Add id in dto
        public int Id { get; set; }
         public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public string ProductType { get; set; }
        public string ProductBrand { get; set; }
    }
    #endregion
}