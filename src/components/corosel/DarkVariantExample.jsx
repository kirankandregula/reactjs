import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
  return (
    <Carousel data-bs-theme="dark" className='mt-5' style={{marginBottom:"155px"}}>
      <div className="carousel-item active">
        <img
          className="d-block w-100"
          src="https://productioncms.rainbowhospitals.in/Uploads/1688973336_Home-page-3-desktop.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5> </h5>
          <p> </p>
        </Carousel.Caption>
      </div>
      <div className="carousel-item">
        <img
          className="d-block w-100"
          src="https://productioncms.rainbowhospitals.in/Uploads/1688973240_home-page-2-desktop.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5> </h5>
          <p> </p>
        </Carousel.Caption>
      </div>
      <div className="carousel-item">
        <img
          className="d-block w-100"
          src="https://productioncms.rainbowhospitals.in/Uploads/1688972879_Vaccination_desktop_21062023.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5> </h5>
          <p>
             
          </p>
        </Carousel.Caption>
      </div>
      <div className="carousel-item">
        <img
          className="d-block w-100"
          src="https://productioncms.rainbowhospitals.in/Uploads/1688972770_Vaccination_Desktop_19062023.jpg"
          alt="Fourth slide"
        />
        <Carousel.Caption>
          <h5> </h5>
          <p>
             
          </p>
        </Carousel.Caption>
      </div>
    </Carousel>
  );
}

export default DarkVariantExample;
