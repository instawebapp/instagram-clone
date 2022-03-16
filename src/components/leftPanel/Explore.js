export default function Explore() {
  return (
    <section className="explore_section">
      <div className="explore_header">
        <h2>Explore</h2>
        <h3>See all</h3>
      </div>
      <ul className="tabs">
        <li>Photograpy</li>
        <li>Nature</li>
        <li>Products</li>
      </ul>
      <div className="products">
        <div className="products_images">
          <div className="first_row first_col">
            <div className="product_img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT40_57Jc1zoJJJp-jqEx4MKPymTZjKJM_DsV4RtI9S07_aBEexqKLHIk5oPoElE7mIi4g&usqp=CAU"
                alt="product"
              />
            </div>
          </div>
          <div className="second_row first_col">
            <div className="product_img">
              <img
                src="https://bestcoursenews.com/wp-content/uploads/2021/11/8-Books-To-Read-for-a-PRINCE2-1.jpg"
                alt="product"
              />
            </div>
          </div>
          <div className="first_row second_col">
            <div className="product_img">
              <img
                src="https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="product"
              />
            </div>
          </div>
          <div className="second_row second_col">
            <div className="product_img">
              <img
                src="https://images.unsplash.com/photo-1638913662415-8c5f79b20656?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                alt="product"
              />
            </div>
          </div>
          <div className="full_row third_col">
            <div className="product_img">
              <img
                src="https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                alt="product"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
