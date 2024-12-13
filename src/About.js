import { Fullscreen } from '@mui/icons-material';
import React from 'react';  

const AboutUs = () => {  
  return (  
    <div style={{  
      fontFamily: 'Roboto, sans-serif',  
      backgroundColor: '#f4f4f4',  
      minHeight: '100vh',  
      display: 'flex',  
      flexDirection: 'column',  
      alignItems: 'center',  
      padding: '40px 20px',
      width: '100%'  
    }}>  
      <section style={{  
        backgroundColor: '#fff',  
        width: '100%',  
        padding: '20px',  
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  
        marginBottom: '40px',  
      }}>  
        <h1 style={{  
          color: '#333',  
          fontSize: '24px',  
          fontWeight: 'bold',  
          margin: 0,  
        }}>Who We Are</h1>  
        <img src="about.png" alt="TRENDISTA's Own" style={{ marginBottom: '20px', maxWidth: '100%' }} />  
      
        <section style={{  
          backgroundColor: '#fff',  
          padding: '20px',  
          borderRadius: '4px',  
          marginBottom: '40px',
          width:'100%',
             
        }}>  
          <h2 style={{  
            color: '#333',  
            fontSize: '20px',  
            fontWeight: 'bold',  
            marginBottom: '20px',  
          }}>About TRENDISTA</h2>  
          <p style={{  
            color: '#333',  
            fontSize: '16px',  
            lineHeight: '1.6',  
            marginBottom: '20px',  
          }}>  
            TRENDISTA is a fashion e-commerce platform that offers the latest trends and styles from top brands. We are committed to providing our customers with a seamless and enjoyable shopping experience.  
          </p>  
          <p style={{  
            color: '#333',  
            fontSize: '16px',  
            lineHeight: '1.6',  
            marginBottom: '0',  
          }}>  
            Our mission is to be the go-to destination for fashion-conscious individuals who seek quality, style, and convenience. We strive to curate a diverse range of products that cater to diverse tastes and preferences.  
          </p>  
        </section> 

      <main style={{    
        width: '100%',  
        backgroundColor: '#fff',  
        padding: '40px',  
        borderRadius: '4px',  
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  
        marginBottom: '40px',
        
      }}>  
         
        <section style={{  
          display: 'flex',  
          justifyContent: 'space-between',  
          marginBottom: '40px',  
        }}>  
          <div style={{  
            backgroundColor: '#fff',  
            padding: '20px',  
            borderRadius: '4px',  
            width: '48%',  
          }}>  
            
            <h2 style={{  
              color: '#536878',  
              fontSize: '20px',  
              fontWeight: 'bold',  
              marginBottom: '20px',  
            }}>TRENDISTA's Own</h2>  
            <p style={{  
              color: '#4D5D53',  
              fontSize: '16px',  
              lineHeight: '1.6',  
              marginBottom: '0',  
            }}>  
              TRENDISTA has its own in-house brands that offer a range of fashion-forward apparel and accessories. Our TRENDISTA-branded products are designed with the latest trends and customer preferences in mind, ensuring a unique and high-quality shopping experience.  
            </p>  
          </div>  
          <div style={{  
            backgroundColor: '#fff',  
            padding: '20px',  
            borderRadius: '4px',  
            width: '48%',  
          }}>  
            <h2 style={{  
              color: '#536878',  
              fontSize: '20px',  
              fontWeight: 'bold',  
              marginBottom: '20px',  
            }}>Exclusive International Labels</h2>  
            <p style={{  
              color: '#4D5D53',  
              fontSize: '16px',  
              lineHeight: '1.6',  
              marginBottom: '0',  
            }}>  
              TRENDISTA offers a curated selection of exclusive international fashion labels. We have partnered with renowned designers and brands from around the world to bring the latest global trends to our customers.  
            </p>  
          </div>  
        </section>  

        <section style={{  
          display: 'flex',  
          justifyContent: 'space-between',  
          marginBottom: '40px',  
        }}>  
          <div style={{  
            backgroundColor: '#fff',  
            padding: '20px',  
            borderRadius: '4px',  
            width: '48%',  
          }}>  
            <h2 style={{  
              color: '#536878',  
              fontSize: '20px',  
              fontWeight: 'bold',  
              marginBottom: '20px',  
            }}>Capsule Collections</h2>  
            <p style={{  
              color: '#4D5D53',  
              fontSize: '16px',  
              lineHeight: '1.6',  
              marginBottom: '0',  
            }}>  
              TRENDISTA's Capsule Collections feature limited-edition, curated fashion pieces that are designed to seamlessly integrate into our customers' wardrobes. These collections are a result of our collaborations with renowned designers and brands, offering unique and fashion-forward options.  
            </p>  
          </div>  
          <div style={{  
            backgroundColor: '#fff',  
            padding: '20px',  
            borderRadius: '4px',  
            width: '48%',  
          }}>  
            <h2 style={{  
              color: '#536878',  
              fontSize: '20px',  
              fontWeight: 'bold',  
              marginBottom: '20px',  
            }}>Our Team</h2>  
            <p style={{  
              color: '#4D5D53',  
              fontSize: '16px',  
              lineHeight: '1.6',  
              marginBottom: '0',  
            }}>  
              Our team is comprised of passionate and dedicated individuals who share a common goal of delivering exceptional service to our customers. We are constantly striving to improve and innovate to meet the evolving needs of the fashion industry.  
            </p>  
          </div>  
        </section>  

        <section style={{  
          backgroundColor: '#fff',  
          padding: '20px',  
          borderRadius: '4px',  
          marginBottom: '0',  
        }}>  
          <h2 style={{  
            color: '#536878',  
            fontSize: '20px',  
            fontWeight: 'bold',  
            marginBottom: '20px',  
          }}>Our Values</h2>  
          <ul style={{  
            color: '#4D5D53',  
            fontSize: '16px',  
            lineHeight: '1.6',  
            padding: '0 0 0 20px',  
            margin: '0 0 20px 0',  
          }}>  
            <li>Customer-Centric Approach</li>  
            <li>Commitment to Quality</li>  
            <li>Innovation and Creativity</li>  
            <li>Sustainable Practices</li>  
            <li>Integrity and Transparency</li>  
          </ul>  
        </section>  
      </main>  
      </section> 
    </div>  
  );  
};  

export default AboutUs;