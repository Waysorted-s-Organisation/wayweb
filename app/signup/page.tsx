"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import OTPInput from "@/app/signup/components/OTPInput";
import { useUser } from "@/hooks/useUser";

type Step = "choose" | "email" | "otp" ;

// Strictly use env-configured URLs; no fallback.
const OTP_URI = process.env.NEXT_PUBLIC_OTP_URI as string | undefined;
const VERIFY_URI = process.env.NEXT_PUBLIC_VERIFY_URI as string | undefined;

type SendOtpResponse = {
  message?: string;
  request_id?: string;
  expires_in?: number;
  error?: string;
};
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="bg-primary-way-100 hover:bg-primary-way-90 cursor-pointer text-white w-full lg:w-sm py-3 rounded-lg transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
              {loading ? "Redirecting..." : "Continue with Google"}
            </button>
            <div className="my-1" />
            <button
              onClick={() => setStep("email")}
              disabled={loading}
              className="bg-secondary-db-5 text-secondary-db-100 cursor-pointer w-full lg:w-sm py-3 rounded-lg transition-all duration-200 disabled:opacity-60"
            >
              Continue with Email
            </button>

            <p className="text-xs text-secondary-db-70 pt-4 pb-2 items-center text-center">
              Creating an account means you agree to our{" "}
              <span className="text-primary-way-100 underline cursor-pointer">Terms</span> and{" "}
              <span className="text-primary-way-100 underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        )}

        {step === "email" && (
          <div className="flex flex-col gap-5 px-6 sm:px-8 pt-8 pb-3">
            <h1 className="text-2xl font-semibold text-black text-center">Create an account</h1>
            <p className="text-sm text-secondary-db-70 text-center">
              Enter your email and we’ll send you a verification code
            </p>

            <div className="relative">
              <label className="absolute -top-2 left-3 px-1 bg-white text-xs text-secondary-db-70" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-secondary-db-20 bg-white outline-none focus:ring-2 focus:ring-primary-way-100"
              />
              <p className="text-xs text-secondary-db-70 mt-1">Your name will be used to personalize the email</p>
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-3 px-1 bg-white text-xs text-secondary-db-70" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-secondary-db-20 bg-white outline-none focus:bg-white focus:ring-2 focus:ring-primary-way-100"
              />
              <p className="text-xs text-secondary-db-70 mt-1">Enter a valid email address to receive the OTP</p>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              onClick={handleSendOtp}
              disabled={loading || !validateEmail(email)}
              className="bg-primary-way-100 hover:bg-primary-way-90 cursor-pointer text-white w-full py-3 rounded-lg transition-all duration-200 disabled:opacity-60"
            >
              {loading ? "Sending code..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === "otp" && (
          <div className="flex flex-col gap-5 px-6 sm:px-8 pt-6 pb-4">
            <div className="w-full">
              <button
                onClick={() => {
                  setError(null);
                  setStep("email");
                }}
                className="text-secondary-db-70 hover:text-secondary-db-100 text-sm flex items-center gap-2"
              >
                <span className="cursor-pointer"><Image src="/icons/back.svg" alt="Back" width={13} height={11} /></span>
              </button>
            </div>

            <h2 className="text-2xl font-semibold text-black text-center">Verify OTP</h2>
            <p className="text-sm text-secondary-db-70 text-center">
              We’ve sent a verification code to {maskedEmail || "your email"}.
              <br />
              Enter the code to verify and continue.
            </p>

            <OTPInput length={6} value={otp} onChange={setOtp} onComplete={setOtp} />

            <p className="text-xs text-secondary-db-70 text-center">
              Resend Code in {remainingLabel}
            </p>

            {error && <p className="text-xs text-red-500 text-center">{error}</p>}

            <button
              onClick={handleVerify}
              disabled={loading || otp.length !== 6 || !requestId}
              className="bg-primary-way-100 hover:bg-primary-way-90 text-white w-full py-3 rounded-lg transition-all duration-200 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={handleResend}
              disabled={remainingSeconds > 0 || loading}
              className="text-sm text-primary-way-100 disabled:text-secondary-db-40"
            >
              Resend Code
            </button>
          </div>
        )}

        <div className="border-t border-secondary-db-5 w-full text-center py-4">
          {(step === "choose" || step === "email") && (
            <p className="text-sm text-secondary-db-70">
              Already have an account?{" "}
              <span className="text-primary-way-100 underline cursor-pointer" onClick={() => router.push("/login")}>
                Log in
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}