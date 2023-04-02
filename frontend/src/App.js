import './App.css';    
import axios from 'axios'
import  React,{useState,useEffect} from 'react'
function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { name, email, subject, message } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/contactinfo', formData);
      alert('Data submitted successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
  
    }
  };
  const [contactInfoList, setContactInfoList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/contact')
      .then(response => {
        setContactInfoList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
   <>
<div className="container">
<form onSubmit={handleSubmit}>

<section className="mb-4">


    <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>

    <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
        a matter of hours to help you.</p>

    <div className="row">

      <div className="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form" action="mail.php" method="POST">

                <div className="row">

                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <input type="text" id="name" value={name} onChange={handleChange} name="name" className="form-control"/>
                            <label for="name" className="">Your name</label>
                        </div>
                    </div>
       
                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <input type="text" id="email" value={email} onChange={handleChange}  name="email" className="form-control"/>
                            <label for="email" className="">Your email</label>
                        </div>
                    </div>


                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="md-form mb-0">
                            <input type="text" id="subject" value={subject} onChange={handleChange}  name="subject" className="form-control"/>
                            <label for="subject" className="">Subject</label>
                        </div>
                    </div>
                </div>
     
                <div className="row">

         
                    <div className="col-md-12">

                        <div className="md-form">
                            <textarea type="text" id="message" value={message} onChange={handleChange}  name="message" rows="2" className="form-control md-textarea"></textarea>
                            <label for="message">Your message</label>
                        </div>

                    </div>
                </div>
      

            </form>

            <div className="text-center text-md-left">
                <button type="submit" className="btn  btn-primary">Submit</button>
            </div>
            <div className="status"></div>
        </div>
        <div className="col-md-3 text-center">
            <ul className="list-unstyled mb-0">
                <li><i className="fas fa-map-marker-alt fa-2x"></i>
                    <p>San Francisco, CA 94126, USA</p>
                </li>

                <li><i className="fas fa-phone mt-4 fa-2x"></i>
                    <p>+ 01 234 567 89</p>
                </li>

                <li><i className="fas fa-envelope mt-4 fa-2x"></i>
                    <p>contact@mdbootstrap.com</p>
                </li>
            </ul>
        </div>

    </div>

</section>
</form>
<ul>
      {contactInfoList.map(contactInfo => (
        <li key={contactInfo.id}>
          <div>{contactInfo.name}</div>
          <div>{contactInfo.email}</div>
          <div>{contactInfo.subject}</div>
          <div>{contactInfo.message}</div>
        </li>
      ))}
    </ul>
</div>
   </>
  );
}

export default App;
