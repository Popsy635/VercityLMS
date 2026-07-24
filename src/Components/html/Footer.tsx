import bg from '../../assets/Frame187.png'
import logo from '../../assets/Union.svg'

export const Footer = () => {
  return (
    <div>
        <div style={{ backgroundImage: `url(${bg})` }} className='footer flex flex-col bg-no-repeat bg-cover  pt-30'>
          <div className="footWrapper  w-6/7 m-auto ">
            <div className="whole-info flex flex-col-reverse md:flex-row justify-between items-center gap-12">
              <div className='flex flex-col items-center relative'>
                <div className='relative  flex justify-center items-center'>
                  <div className=' flex flex-col gap-4 items-start z-10 absolute w-100 h-50'>
                    <img src={logo} alt="" />
                  </div>
                  <div >
                    <div className='bg-white/40 h-90 w-90 rounded-full blur-3xl  '></div>
                  </div>

                </div>
                <div className='absolute z-20 flex flex-col  items-center bottom-0 gap-4'>
                  <h1 className='text-2xl text-white text-center leading-7'>Acquire Skills <br />For Professional Growth</h1>
                  <div>
                    <div className='flex gap-10'>
                      <div className='appleLogo'><a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Apple--Streamline-Svg-Logos" height="24" width="24">
                          <desc>
                            Apple Streamline Icon: https://streamlinehq.com
                          </desc>
                          <path fill="#FFFFFF" d="M18.41345 12.7348c0.033025 3.5563 3.119825 4.73975 3.154025 4.75485 -0.0261 0.083475 -0.493225 1.686525 -1.626275 3.342375 -0.979475 1.431575 -1.996025 2.8579 -3.597425 2.887425 -1.573525 0.029 -2.079475 -0.9331 -3.878475 -0.9331 -1.798425 0 -2.3606 0.903575 -3.8501 0.9621 -1.54575 0.0585 -2.7228 -1.54805 -3.710425 -2.974375C2.886725 17.8565 1.3445 12.529675 3.4153 8.933975c1.02875 -1.78565 2.867175 -2.916375 4.8626 -2.945375 1.5179 -0.02895 2.9506 1.021175 3.878475 1.021175 0.927325 0 2.66835 -1.262875 4.49865 -1.0774 0.7662 0.031875 2.917 0.3095 4.298075 2.33105 -0.111275 0.068975 -2.566325 1.4982 -2.53965 4.471375Zm-2.95725 -8.732675C16.27685 3.008775 16.8292 1.6259225 16.6785 0.25c-1.182875 0.0475425 -2.613275 0.78825 -3.46175 1.7810625 -0.760375 0.8791875 -1.4263 2.2863625 -1.246625 3.6350625 1.318475 0.102 2.6654 -0.67 3.486075 -1.664Z" stroke-width="0.25"></path>
                        </svg>
                      </a></div>
                      <div className='facebook'>
                        <a href="">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Facebook--Streamline-Simple-Icons" height="24" width="24">
                            <desc>
                              Facebook Streamline Icon: https://streamlinehq.com
                            </desc>
                            <title>Facebook</title>
                            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0 -4.085 1.848 -5.978 5.858 -5.978 0.401 0 0.955 0.042 1.468 0.103a8.68 8.68 0 0 1 1.141 0.195v3.325a8.623 8.623 0 0 0 -0.653 -0.036 26.805 26.805 0 0 0 -0.733 -0.009c-0.707 0 -1.259 0.096 -1.675 0.309a1.686 1.686 0 0 0 -0.679 0.622c-0.258 0.42 -0.374 0.995 -0.374 1.752v1.297h3.919l-0.386 2.103 -0.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0 -6.627 -5.373 -12 -12 -12s-12 5.373 -12 12c0 5.628 3.874 10.35 9.101 11.647Z" fill="#FFFFFF" stroke-width="1"></path>
                          </svg>
                        </a>
                      </div>
                      <div className='gmailLogo'>
                        <button className='cursor-pointer'>
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Gmail--Streamline-Simple-Icons" height="24" width="24">
                            <desc>
                              Gmail Streamline Icon: https://streamlinehq.com
                            </desc>
                            <title>Gmail</title>
                            <path d="M24 5.457v13.909c0 0.904 -0.732 1.636 -1.636 1.636h-3.819V11.73L12 16.64l-6.545 -4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0 -2.023 2.309 -3.178 3.927 -1.964L5.455 4.64 12 9.548l6.545 -4.91 1.528 -1.145C21.69 2.28 24 3.434 24 5.457z" fill="#FFFFFF" stroke-width="1"></path>
                          </svg>
                        </button >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-info flex flex-col md:flex-row gap-10 md:gap-20">
                <div className='flex flex-col  gap-4 '>
                  <div className='flex flex-col '>
                    <h1 className='text-white font-semibold text-2xl'>Vercity</h1>
                  </div>
                  <ul className='gap-4 flex text-sm  flex-col'>
                    <li className='text-white text-xl font-light'><a href="">About</a></li>

                    <li className='text-white text-xl font-light'><a href="">Career</a></li>
                    <li className='text-white text-xl font-light'><a href="">Professional Certificate</a></li>


                  </ul>
                </div>
                <div className='flex flex-col text-sm  gap-4 '>
                  <div className='flex flex-col '>
                    <h1 className='text-white font-semibold text-2xl'>Community</h1>
                  </div>
                  <ul className='gap-4 flex flex-col '>

                    <li className='text-white text-xl font-light'><a href="">Resources</a></li>
                    <li className='text-white text-xl font-light'><a href="">Privacy Policy</a></li>
                    <li className='text-white text-xl font-light'><a href="">Terms & Conditions</a></li>
                    <li className='text-white text-xl font-light'><a href="">Teach on Vercity</a></li>


                  </ul>
                </div>
                <div className='flex flex-col text-sm  gap-4 '>
                  <div className='flex flex-col '>
                    <h1 className='text-white font-semibold text-2xl'>More</h1>
                  </div>
                  <ul className='gap-4 flex flex-col '>

                    <li className='text-white text-xl font-light'><a href="">FAQ</a></li>
                    <li className='text-white text-xl font-light'><a href="">Plans and Pricing</a></li>
                    <li className='text-white text-xl font-light'><a href="">Contact Us</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className='w-6/7 m-auto text-white text-sm my-20  text-center pt-5'>

            <p className='pt-5'>
              ©2026 Vercity All Rights Reserved
            </p>


          </div>
        </div>
    </div>
  )
}
