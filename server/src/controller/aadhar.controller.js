import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"

const authorization = process.env.AUTHENTICATION;
const xApiKey = process.env.API_KEY;

const sendOTPByAadhar = asyncHandler(async (req, res) => {
    const { aadharNumber } = req.body
    if (!aadharNumber) {
        throw new ApiError(400, "aadhar number is required")
    }

    const options = {
        method: 'POST',
        headers: {
            'x-api-key': xApiKey,
            Authorization: authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            '@entity': 'in.co.sandbox.kyc.aadhaar.okyc.otp.request',
            aadhaar_number: aadharNumber,
            consent: 'y',
            reason: 'For KYC'
        })
    };

    const response = await fetch('https://api.sandbox.co.in/kyc/aadhaar/okyc/otp', options);
    const data = await response.json();
    console.log({data})
    if (response.status !== 200) {
        throw new ApiError(response.status, data.message || "Failed to send OTP")
    }

    return res.status(200).json(new ApiResponse(200, data, "OTP sent successfully"))
})

const verifyAadharOTP = asyncHandler(async (req, res) => {
    const { reference_id, otp } = req.body
    if (!reference_id || !otp) {
        throw new ApiError(400, "reference_id and otp are required")
    }

    const options = {
        method: 'POST',
        headers: {
            'x-api-key': xApiKey,
            Authorization: authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            '@entity': 'in.co.sandbox.kyc.aadhaar.okyc.request',
            reference_id: reference_id,
            otp: otp
        })
    };

    const response = await fetch('https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify', options);
    const data = await response.json();
    console.log({data})
    if (response.status !== 200) {
        throw new ApiError(response.status, data.message || "Failed to verify OTP")
    }

    return res.status(200).json(new ApiResponse(200, data, "OTP verified successfully"))
})

export {
    sendOTPByAadhar,
    verifyAadharOTP
}