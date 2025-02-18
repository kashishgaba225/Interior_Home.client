import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIURL } from "../GlobalURL";
import {showSuccessToast,showErrorToast,showWarningToast} from './React Toastify/ToastiNotificcation'
import axios from "axios";

const OtpVerification = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const email = localStorage.getItem("UserEMail");

  const [code, setCode] = useState(new Array(4).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      setCanResend(false);
      setTimeLeft(30);
      const url = `${APIURL}reSendOTP/${userId}`;

      await axios.get(url);
      showSuccessToast('New OTP has been sent to your email')
      

      // Restart the timer
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      showWarningToast(err.response?.data?.msg || "Failed to resend OTP")
      
    }
  };

  const handleChange = (element, index) => {
    const value = element.value;
    if (!/^\d?$/.test(value)) return;

    let newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userOtp = code.join("");

    try {

      const url = `${APIURL}verify/${userId}`;
      const response = await axios.post(url, { otp: userOtp });

      if (response.status === 200){
        showSuccessToast('User verified Successfully')
      navigate("/Login");
    }

      else showWarningToast("Invalid data");

    }
    catch (err) { window.alert
      showErrorToast(err.response?.data?.msg || "An error occurred"); }

    finally { setIsLoading(false); }
  };

  return (
    <div className=" flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className=" bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email - <span className="font-bold">{email}</span></p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {code.map((data, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        id={`otp-input-${index}`}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        maxLength="1"
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={(e) => e.target.select()}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-purple-700 border-none text-white text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Verifying...' : 'Verify Account'}
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        className="text-purple-600 cursor-pointer"
                      >
                        Resend
                      </button>
                    ) : (
                      <span>Resend in {timeLeft}s</span>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;