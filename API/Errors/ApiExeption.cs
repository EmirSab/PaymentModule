namespace API.Errors
{
    public class ApiExeption : ApiResponse
    {
        #region 5.52 Added class for exeption -> Middleware/ExceptionMiddleware
        public ApiExeption(int statusCode, string message = null, string details = null) : base(statusCode, message)
        {
            Details = details;
        }

        public string Details { get; set; }
        #endregion
    }
}