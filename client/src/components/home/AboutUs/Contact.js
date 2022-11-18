import React, { useState } from "react"

const Contact = () => {
    const [data, setData] = useState({
      fullname: "",
      phone: "",
      email: "",
      subject: "",
      message: "",})
  
    const InputEvent = (event) => {
      const { name, value } = event.target
  
      setData((preVal) => {
        return {
          ...preVal,
          [name]: value,
        }
      })
    }
  
    const formSubmit = (event) => {
      event.preventDefault()
      alert(
        `My name is ${data.fullname}. 
      My phone number is ${data.phone}. 
      My email address is ${data.email}. 
      My Subject on  ${data.subject}. 
      Here is my message I want to say : ${data.message}. 
      `
      )
    }
    return (
      <>
        <section className='Contact' id='contact'>
          <div className='container top'>
            <div className='heading'>
              <h4 className="uppercase">Liên hệ</h4>
              <br/>
              <h2 className="text-5xl text-slate-500">VỚI CHÚNG TÔI</h2>
            </div>
  
            <div className='content d_flex'>
              <div className='left'>
                <div className='box box_shadow'>
                  <div className='img'>
                    <img src="/contact1.png" alt='' />
                  </div>
                  <div className='details'>
                    <h1>VietHan Musical</h1>
                    <p>Hãy gửi yêu cầu của bạn đến chúng tôi để được tư vấn.</p> <br />
                    <p>Phone: +01234567890</p>
                    <p>Email: viethanMusical@vku.udn.vn</p> <br />
                    <span className="uppercase">Theo dõi tại</span>
                    <div className='button f_flex'>
                      <button className='btn_shadow'>
                        <i className='fab fa-facebook-f'></i>
                      </button>
                      <button className='btn_shadow'>
                        <i className='fab fa-instagram'></i>
                      </button>
                      <button className='btn_shadow'>
                        <i className='fab fa-twitter'></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className='right box_shadow'>
                <form onSubmit={formSubmit}>
                  <div className='f_flex'>
                    <div className='input rowContact'>
                      <span>YOUR NAME</span>
                      <input type='text' name='fullname' value={data.fullname} onChange={InputEvent} />
                    </div>
                    <div className='input rowContact'>
                      <span>PHONE NUMBER </span>
                      <input type='number' name='phone' value={data.phone} onChange={InputEvent} />
                    </div>
                  </div>
                  <div className='input'>
                    <span>EMAIL </span>
                    <input type='email' name='email' value={data.email} onChange={InputEvent} />
                  </div>
                  <div className='input'>
                    <span>SUBJECT </span>
                    <input type='text' name='subject' value={data.subject} onChange={InputEvent} />
                  </div>
                  <div className='input'>
                    <span>YOUR MESSAGE </span>
                    <textarea cols='30' rows='10' name='message' value={data.message} onChange={InputEvent}></textarea>
                  </div>
                  <button className='btn_shadow'>
                    SEND MESSAGE <i className='fa fa-long-arrow-right'></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
  
  export default Contact