import React, {useState} from "react";
import "./ContactUs.css";
import {useNavigate} from 'react-router-dom'
const ContactUs = () => {
 const [inputValues, setInputValues] = useState("") 
 const navigate = useNavigate()
const handleMessage = () => {alert("Message sent")
  navigate('/')
}

  return (
    <>
      <section className="content-container">
        <div className="textArea">
          <h2>Contact Us</h2>

          <p>
            WE DONT DO REFUNDS OR EXCHANGES!
            <br />
            But we would love to hear all you complaints!.
            <br />
            For any chatter,drop us an email!
            <br />
            However we suck at responding
          </p>
          <p>NO WARRANTY ON SHIT!</p>
        </div>

        <div className="block">
          <div className="row">
            <div className="col-left">
              <form id="contact" action="">
                <h4>Leave us a message</h4>
                <fieldset>
                  <input
                    placeholder="Your Name"
                    type="text"
                    tabIndex="1"
                    required
                    autoFocus
                  
                  />
                </fieldset>
                <fieldset>
                  <input
                    placeholder="Subject"
                    type="text"
                    tabIndex="2"
                    required
                    autoFocus
                  />
                </fieldset>
                <fieldset>
                  <input
                    placeholder="Your Email Address"
                    type="email"
                    tabIndex="3"
                    required
                  />
                </fieldset>
                <fieldset>
                  <input
                    placeholder="Your Phone Number"
                    type="tel"
                    tabIndex="4"
                    required
                  />
                </fieldset>
                <fieldset>
                  <textarea
                    placeholder="Type your Message Here...."
                    tabIndex="5"
                    required
                   
                  ></textarea>
                </fieldset>
                <fieldset>
                  <button
                    name="submit"
                    type="submit"
                    id="contact-submit"
                    data-submit="...Sending"
                    onClick={handleMessage}
                  >
                    Submit
                  </button>
                </fieldset>
              </form>
            </div>
            <div className="col-right">
              <div id="details">
                <h4>Drop by our Office</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <i className="fa fa-map-marker fa- "></i>
                      </td>
                      <td>
                        Reactions,
                        <br />
                        c/o React
                        <br />
                        YourMomma House,
                        <br />
                        69699,
                        <br />
                        Tennessee
                        <p></p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i className="fa fa-phone fa- "></i>
                      </td>
                      <td>Phone No : 865-118-0608</td>
                    </tr>
                    <tr>
                      <td>
                        <i className="fa fa-clock-o fa- "></i>
                      </td>
                      <td>
                        Operation Time:
                        <br />
                        24 Hrs Live Baby <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i className="fa fa-envelope fa- "></i>
                      </td>
                      <td>Email : StillwituRmom@gmail.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
