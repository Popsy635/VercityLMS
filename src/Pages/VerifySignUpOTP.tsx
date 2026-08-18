import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";

export const VerifySignUpOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  // -------------------------
  // VERIFY OTP
  // -------------------------
  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setErrMsg("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    setErrMsg("");
    setSuccess("");

    try {
      await axios.post(
        "/auth/verifyemailotp",
        {
          email,
          otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setSuccess("Email verified successfully!");

      setTimeout(() => {
        navigate("/Login");
      }, 1000);

    } catch (error: any) {
      console.error(error);

      if (error.response?.status === 400) {
        setErrMsg("Invalid or expired OTP.");
      } else {
        setErrMsg("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  // -------------------------
  // RESEND OTP
  // -------------------------
  const handleResendOTP = async () => {
    setResending(true);
    setErrMsg("");
    setSuccess("");

    try {
      await axios.post(
        "/auth/resendEmailOTP",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setSuccess("A new OTP has been sent to your email.");

    } catch (error: any) {
      console.error(error);

      if (error.response?.status === 404) {
        setErrMsg("User not found.");
      } else if (error.response?.status === 429) {
        setErrMsg("Too many requests. Please wait before requesting another OTP.");
      } else {
        setErrMsg("Unable to resend OTP. Please try again.");
      }

    } finally {
      setResending(false);
    }
  };


  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6">

      <div className="w-full max-w-md">

        <h1 className="text-4xl font-semibold text-vercity mb-3">
          Verify your email
        </h1>

        <p className="text-gray-600 mb-8">
          We sent a verification code to
          <br />
          <strong>{email}</strong>
        </p>

        {errMsg && (
          <p className="text-red-500 text-sm mb-4">
            {errMsg}
          </p>
        )}

        {success && (
          <p className="text-green-600 text-sm mb-4">
            {success}
          </p>
        )}

        <form
          onSubmit={handleVerify}
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              const value = e.target.value
                .replace(/\D/g, "")
                .slice(0, 6);

              setOtp(value);
            }}
            placeholder="Enter OTP"
            className="w-full border border-gray-300 rounded-xl px-4 py-4 text-center text-2xl tracking-[0.5em] focus:outline-2 focus:outline-vercity"
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="bg-vercity text-white px-4 py-3 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-500 text-sm">
            Didn't receive the code?
          </p>

          <button
            type="button"
            onClick={handleResendOTP}
            disabled={resending}
            className="text-vercity font-medium mt-2 disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>

        </div>

      </div>

    </section>
  );
};