// src/components/associationForm/AssociationForm.jsx

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";

// Reusable Gradient Input Component
const GradientInput = ({
  id,
  label,
  register,
  required,
  pattern,
  minLength,
  type = "text",
  placeholder,
  errors,
  disabled = false,
}) => (
  <div>
    <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
      <input
        id={id}
        type={type}
        {...register(id, {
          required: required ? `${label} is required` : false,
          pattern: pattern && {
            value: pattern.value,
            message: pattern.message,
          },
          minLength: minLength && {
            value: minLength.value,
            message: minLength.message,
          },
        })}
        disabled={disabled}
        className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
          errors[id] ? "ring-2 ring-red-500" : ""
        }`}
        placeholder={placeholder}
      />
    </div>
    {errors[id] && (
      <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>
    )}
  </div>
);

const AssociationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
    reset,
    control,
    unregister,
  } = useForm({
    mode: "onBlur",
  });

  const [step, setStep] = useState(1);
  const [isSameAsMobilePresident, setIsSameAsMobilePresident] = useState(false);
  const [isSameAsMobileSecretary, setIsSameAsMobileSecretary] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  // Watch specific fields
  const mobileNumberPresident = watch("presidentMobileNumber");
  const mobileNumberSecretary = watch("secretaryMobileNumber");
  const associationLogo = useWatch({ control, name: "associationLogo" });

  // Signature Pad Ref
  const signaturePadRef = useRef({});

  // Convert file to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle logo preview
  useEffect(() => {
    if (associationLogo && associationLogo.length > 0) {
      const file = associationLogo[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  }, [associationLogo]);

  // Retrieve stored form data and step from localStorage after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedFormData = JSON.parse(
          localStorage.getItem("associationFormData")
        );
        const storedStep = parseInt(
          localStorage.getItem("associationFormStep"),
          10
        );

        if (storedFormData) {
          Object.keys(storedFormData).forEach((field) => {
            // Special handling for file inputs
            if (field === "associationLogo") {
              // Files cannot be stored in localStorage. You might need to handle this differently.
              // For now, we'll skip setting the file input from localStorage.
            } else {
              setValue(field, storedFormData[field]);
            }
          });

          // Check if WhatsApp numbers are same as mobile numbers
          if (
            storedFormData.presidentWhatsappNumber &&
            storedFormData.presidentWhatsappNumber ===
              storedFormData.presidentMobileNumber
          ) {
            setIsSameAsMobilePresident(true);
          }

          if (
            storedFormData.secretaryWhatsappNumber &&
            storedFormData.secretaryWhatsappNumber ===
              storedFormData.secretaryMobileNumber
          ) {
            setIsSameAsMobileSecretary(true);
          }
        }

        if (storedStep && storedStep >= 1 && storedStep <= 4) {
          setStep(storedStep);
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, [setValue]);

  // Synchronize WhatsApp Numbers with Mobile Numbers when checkbox is checked
  useEffect(() => {
    if (isSameAsMobilePresident) {
      setValue("presidentWhatsappNumber", mobileNumberPresident || "");
    }
  }, [mobileNumberPresident, isSameAsMobilePresident, setValue]);

  useEffect(() => {
    if (isSameAsMobileSecretary) {
      setValue("secretaryWhatsappNumber", mobileNumberSecretary || "");
    }
  }, [mobileNumberSecretary, isSameAsMobileSecretary, setValue]);

  // Watch all form fields for localStorage synchronization
  const watchedFields = useWatch({
    control,
  });

  // Persist form data and step to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const dataToStore = { ...watchedFields };
        // Exclude file inputs from localStorage
        delete dataToStore.associationLogo;
        localStorage.setItem(
          "associationFormData",
          JSON.stringify(dataToStore)
        );
        localStorage.setItem("associationFormStep", step);
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [watchedFields, step]);

  const onSubmit = async (data) => {
    // Create a new FormData instance to handle file uploads
    const formData = new FormData();
  
    // Append text inputs to FormData
    Object.keys(data).forEach((key) => {
      // Skip appending associationLogo here because it will be handled separately
      if (key !== "associationLogo") {
        formData.append(key, data[key]);
      }
    });
  
    // President's signature
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const signatureDataUrl = signaturePadRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      const signatureBlob = await (await fetch(signatureDataUrl)).blob();
      formData.append("signature", signatureBlob, "signature.png");
    } else {
      alert("President's signature is required.");
      return;
    }
  
    // Append logo if it exists
    if (data.associationLogo && data.associationLogo.length > 0) {
      formData.append("logo", data.associationLogo[0]);
    }
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/association/Addassociation`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      const result = await response.json();
      if (response.ok) {
        alert("Form submitted successfully!");
  
        // Optionally clear form and localStorage
        reset();
        localStorage.removeItem("associationFormData");
        localStorage.removeItem("associationFormStep");
      } else {
        console.error("Form submission error:", result);
        alert("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  
  

  const nextStep = async () => {
    const isStepValid = await trigger(getFieldsByStep(step));
    if (isStepValid && step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  // Helper function to get fields for the current step
  const getFieldsByStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return [
          "associationName",
          "country",
          "locationCity",
          "associationContactNumber",
          "associationEmail",
          "password",
          "websiteLink",
          "yearEstablished",
          "numberOfMembers",
          "associationLogo",
        ];
      case 2:
        return [
          "presidentName",
          "presidentMobileNumber",
          "presidentWhatsappNumber",
          "presidentEmail",
          "presidentDistrict",
          "presidentTaluka",
          "presidentVillage",
        ];
      case 3:
        return [
          "secretaryName",
          "secretaryMobileNumber",
          "secretaryWhatsappNumber",
          "secretaryDistrict",
          "secretaryTaluka",
          "secretaryVillage",
        ];
      case 4:
        return ["associationActivities", "activityDate"];
      default:
        return [];
    }
  };

  // Helper function to render circular progress indicators
  const renderStepIndicator = () => {
    const steps = [1, 2, 3, 4];
    return (
      <div className="mb-6">
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-center">
          {steps.map((s, index) => (
            <div key={s} className="flex flex-col items-center flex-1">
              {/* Gradient Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    s <= step
                      ? "bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2]"
                      : "bg-white border border-gray-300"
                  }`}
                >
                  {/* Step Number */}
                  <span
                    className={`font-semibold ${
                      s <= step ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {s}
                  </span>
                </div>
                {/* Step Label */}
                <div
                  className={`mt-2 text-sm ${
                    s <= step ? "text-[#3D87E8]" : "text-gray-400"
                  }`}
                >
                  {getStepLabel(s)}
                </div>
              </div>
              {/* Connecting Line (Except After Last Step) */}
              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    s < step
                      ? "bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2]"
                      : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex justify-between items-center overflow-x-auto">
          {steps.map((s) => (
            <div key={s} className="flex flex-col items-center mx-2">
              {/* Gradient Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  s <= step
                    ? "bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2]"
                    : "bg-white border border-gray-300"
                }`}
              >
                {/* Step Number */}
                <span
                  className={`font-semibold text-sm ${
                    s <= step ? "text-white" : "text-gray-400"
                  }`}
                >
                  {s}
                </span>
              </div>
              {/* Step Label */}
              <div
                className={`mt-1 text-[9px] ${
                  s <= step ? "text-[#3D87E8]" : "text-gray-400"
                } text-center`}
              >
                {getStepLabel(s)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Helper function to get step labels
  const getStepLabel = (currentStep) => {
    switch (currentStep) {
      case 1:
        return "Association Details";
      case 2:
        return "President Details";
      case 3:
        return "General Secretary Details";
      case 4:
        return "Association Activities";
      default:
        return "";
    }
  };

  // Render Step 1: Association Details
  const renderAssociationDetails = () => (
    <div className="space-y-4">
      {/* Association Name */}
      <GradientInput
        id="associationName"
        label="Association Name"
        register={register}
        required={true}
        minLength={{
          value: 2,
          message: "Association Name must be at least 2 characters",
        }}
        errors={errors}
        placeholder="Enter Association Name"
      />

      {/* Country */}
      <GradientInput
        id="country"
        label="Country"
        register={register}
        required={true}
        minLength={{
          value: 2,
          message: "Country must be at least 2 characters",
        }}
        errors={errors}
        placeholder="Enter Country"
      />

      {/* Location / City */}
      <GradientInput
        id="locationCity"
        label="Location / City"
        register={register}
        required={true}
        minLength={{
          value: 2,
          message: "Location / City must be at least 2 characters",
        }}
        errors={errors}
        placeholder="Enter Location or City"
      />

      {/* Association Contact No */}
      <GradientInput
        id="associationContactNumber"
        label="Association Contact No"
        register={register}
        required={true}
        pattern={{
          value: /^\+?[0-9]{4,15}$/,
          message:
            "Invalid contact number. It should contain between 4 to 15 digits and + special character.",
        }}
        errors={errors}
        placeholder="Enter Association Contact Number"
        type="tel"
      />

      {/* Email Address */}
      <GradientInput
        id="associationEmail"
        label="Email Address"
        register={register}
        required={true}
        pattern={{
          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          message: "Invalid email address",
        }}
        errors={errors}
        placeholder="Enter Email Address"
        type="email"
      />

      {/* Password */}
      <GradientInput
        id="password"
        label="Password"
        register={register}
        required={true}
        pattern={{
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/,
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }}
        minLength={{
          value: 8,
          message: "Password must be at least 8 characters",
        }}
        errors={errors}
        placeholder="Enter Password"
        type="password"
      />
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
      )}
      {/* Password Guidance */}
      <p className="text-gray-500 text-sm mt-1">
        Password must be at least 8 characters and include uppercase, lowercase,
        number, and special character.
      </p>

      {/* Website Link (Optional) */}
      <div>
        <label
          htmlFor="websiteLink"
          className="block mb-1 font-medium text-gray-700"
        >
          Website Link (Optional)
        </label>
        <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
          <input
            id="websiteLink"
            type="url"
            {...register("websiteLink", {
              pattern: {
                value:
                  /^(https?:\/\/)?([\w\d\-]+\.){1,}[\w]{2,}(\/[\w\d\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                message: "Invalid URL",
              },
            })}
            className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
              errors.websiteLink ? "ring-2 ring-red-500" : ""
            }`}
            placeholder="Enter Website Link"
          />
        </div>
        {errors.websiteLink && (
          <p className="text-red-500 text-sm mt-1">
            {errors.websiteLink.message}
          </p>
        )}
      </div>

      {/* Year of Established */}
      <GradientInput
        id="yearEstablished"
        label="Year of Established"
        register={register}
        required={true}
        pattern={{
          value: /^\d{4}$/,
          message: "Year must be a valid 4-digit number",
        }}
        minLength={{
          value: 4,
          message: "Year must be 4 digits",
        }}
        maxLength={{
          value: 4,
          message: "Year must be 4 digits",
        }}
        min={{
          value: 1800,
          message: "Year must be valid",
        }}
        max={{
          value: new Date().getFullYear(),
          message: "Year cannot be in the future",
        }}
        errors={errors}
        placeholder="e.g., 1990"
        type="number"
      />

      {/* Number of Registered Members */}
      <GradientInput
        id="numberOfMembers"
        label="Number of Registered Members"
        register={register}
        required={true}
        pattern={{
          value: /^\d+$/,
          message: "Number of Members must be a positive integer",
        }}
        min={{
          value: 1,
          message: "There must be at least one member",
        }}
        max={{
          value: 1000000,
          message: "Number of members seems too large",
        }}
        errors={errors}
        placeholder="Enter Number of Registered Members"
        type="number"
      />

      {/* Association Logo (Optional) */}
      <div>
        <label
          htmlFor="associationLogo"
          className="block mb-1 font-medium text-gray-700"
        >
          Association Logo (Optional)
        </label>
        <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
          <input
            id="associationLogo"
            type="file"
            accept="image/*"
            {...register("associationLogo")}
            className="w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg"
          />
        </div>
        {logoPreview && (
          <div className="mt-2">
            <Image
              src={logoPreview}
              alt="Association Logo Preview"
              width={96} // 24 * 4 = 96px
              height={96}
              className="object-cover rounded"
            />
          </div>
        )}
      </div>
    </div>
  );

  // Render Step 2: President Details
  const renderPresidentDetails = () => (
    <div className="space-y-4">
      {/* President Name */}
      <GradientInput
        id="presidentName"
        label="President Name"
        register={register}
        required={true}
        minLength={{
          value: 2,
          message: "President Name must be at least 2 characters",
        }}
        errors={errors}
        placeholder="Enter President's Name"
      />

      {/* President Mobile Number */}
      <GradientInput
        id="presidentMobileNumber"
        label="Mobile Number"
        register={register}
        required={true}
        pattern={{
          value: /^\+?[0-9]{4,15}$/,
          message:
            "Invalid mobile number. It should contain between 4 to 15 digits and + special character.",
        }}
        errors={errors}
        placeholder="Enter Mobile Number"
        type="tel"
      />

      {/* President WhatsApp Number */}
      <div>
        <label
          htmlFor="presidentWhatsappNumber"
          className="block mb-1 font-medium text-gray-700"
        >
          WhatsApp Number <span className="text-red-500">*</span>
        </label>
        <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
          <input
            id="presidentWhatsappNumber"
            type="tel"
            {...register("presidentWhatsappNumber", {
              required: "WhatsApp Number is required",
              pattern: {
                value: /^\+?[0-9]{4,15}$/,
                message:
                  "Invalid WhatsApp number. It should contain between 4 to 15 digits and + special character.",
              },
            })}
            className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
              errors.presidentWhatsappNumber ? "ring-2 ring-red-500" : ""
            }`}
            placeholder="Enter WhatsApp Number"
            disabled={isSameAsMobilePresident}
          />
        </div>
        {errors.presidentWhatsappNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.presidentWhatsappNumber.message}
          </p>
        )}
      </div>

      {/* Checkbox for WhatsApp Number Same as Mobile Number */}
      <div className="flex items-center">
        <input
          id="sameAsMobilePresident"
          type="checkbox"
          checked={isSameAsMobilePresident}
          onChange={(e) => {
            const checked = e.target.checked;
            setIsSameAsMobilePresident(checked);
            if (checked) {
              setValue("presidentWhatsappNumber", mobileNumberPresident || "");
            } else {
              setValue("presidentWhatsappNumber", "");
            }
          }}
          className="h-4 w-4 text-[#3D87E8] focus:ring-[#3D87E8] border-gray-300 rounded"
        />
        <label
          htmlFor="sameAsMobilePresident"
          className="ml-2 block text-sm text-gray-700"
        >
          WhatsApp number is same as mobile number
        </label>
      </div>

      {/* President Email */}
      <GradientInput
        id="presidentEmail"
        label="Email"
        register={register}
        required={true}
        pattern={{
          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          message: "Invalid email address",
        }}
        errors={errors}
        placeholder="Enter Email Address"
        type="email"
      />

      {/* Native Address Section */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          Native Address
        </h3>
        <div className="space-y-4">
          {/* District */}
          <GradientInput
            id="presidentDistrict"
            label="District"
            register={register}
            required={true}
            minLength={{
              value: 2,
              message: "District must be at least 2 characters",
            }}
            errors={errors}
            placeholder="Enter District"
          />

          {/* Taluka */}
          <GradientInput
            id="presidentTaluka"
            label="Taluka"
            register={register}
            required={true}
            minLength={{
              value: 2,
              message: "Taluka must be at least 2 characters",
            }}
            errors={errors}
            placeholder="Enter Taluka"
          />

          {/* Village */}
          <GradientInput
            id="presidentVillage"
            label="Village"
            register={register}
            required={true}
            minLength={{
              value: 2,
              message: "Village must be at least 2 characters",
            }}
            errors={errors}
            placeholder="Enter Village"
          />
        </div>
      </div>
    </div>
  );

  // Render Step 3: General Secretary Details
  const renderSecretaryDetails = () => (
    <div className="space-y-4">
      {/* General Secretary Name */}
      <GradientInput
        id="secretaryName"
        label="General Secretary Name"
        register={register}
        required={true}
        minLength={{
          value: 2,
          message: "General Secretary Name must be at least 2 characters",
        }}
        errors={errors}
        placeholder="Enter General Secretary's Name"
      />

      {/* Secretary Mobile Number */}
      <GradientInput
        id="secretaryMobileNumber"
        label="Mobile Number"
        register={register}
        required={true}
        pattern={{
          value: /^\+?[0-9]{4,15}$/,
          message:
            "Invalid mobile number. It should contain between 4 to 15 digits and + special character.",
        }}
        errors={errors}
        placeholder="Enter Mobile Number"
        type="tel"
      />

      {/* Secretary WhatsApp Number */}
      <div>
        <label
          htmlFor="secretaryWhatsappNumber"
          className="block mb-1 font-medium text-gray-700"
        >
          WhatsApp Number <span className="text-red-500">*</span>
        </label>
        <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
          <input
            id="secretaryWhatsappNumber"
            type="tel"
            {...register("secretaryWhatsappNumber", {
              required: "WhatsApp Number is required",
              pattern: {
                value: /^\+?[0-9]{4,15}$/,
                message:
                  "Invalid WhatsApp number. It should contain between 4 to 15 digits and + special character.",
              },
            })}
            className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
              errors.secretaryWhatsappNumber ? "ring-2 ring-red-500" : ""
            }`}
            placeholder="Enter WhatsApp Number"
            disabled={isSameAsMobileSecretary}
          />
        </div>
        {errors.secretaryWhatsappNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.secretaryWhatsappNumber.message}
          </p>
        )}
      </div>

      {/* Checkbox for WhatsApp Number Same as Mobile Number */}
      <div className="flex items-center">
        <input
          id="sameAsMobileSecretary"
          type="checkbox"
          checked={isSameAsMobileSecretary}
          onChange={(e) => {
            const checked = e.target.checked;
            setIsSameAsMobileSecretary(checked);
            if (checked) {
              setValue("secretaryWhatsappNumber", mobileNumberSecretary || "");
            } else {
              setValue("secretaryWhatsappNumber", "");
            }
          }}
          className="h-4 w-4 text-[#3D87E8] focus:ring-[#3D87E8] border-gray-300 rounded"
        />
        <label
          htmlFor="sameAsMobileSecretary"
          className="ml-2 block text-sm text-gray-700"
        >
          WhatsApp number is same as mobile number
        </label>
      </div>

      {/* Native Address Section */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          Native Address
        </h3>
        <div className="space-y-4">
          {/* District */}
          <GradientInput
            id="secretaryDistrict"
            label="District"
            register={register}
            required={true}
            minLength={{
              value: 2,
              message: "District must be at least 2 characters",
            }}
            errors={errors}
            placeholder="Enter District"
          />

          {/* Taluka */}
          <GradientInput
            id="secretaryTaluka"
            label="Taluka"
            register={register}
            required={true}
            minLength={{
              value: 2,
              message: "Taluka must be at least 2 characters",
            }}
            errors={errors}
            placeholder="Enter Taluka"
          />

          {/* Village */}
          <GradientInput
            id="secretaryVillage"
            label="Village"
            register={register}
            required={true}
            minLength={{
              value: 2,
              message: "Village must be at least 2 characters",
            }}
            errors={errors}
            placeholder="Enter Village"
          />
        </div>
      </div>
    </div>
  );

  // Render Step 4: Association Activities
  const renderAssociationActivities = () => (
    <div className="space-y-4">
      {/* Provide Information about Association Activities */}
      <div>
        <label
          htmlFor="associationActivities"
          className="block mb-1 font-medium text-gray-700"
        >
          Provide Information about Association Activities{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
          <textarea
            id="associationActivities"
            {...register("associationActivities", {
              required: "Association Activities information is required",
              minLength: {
                value: 10,
                message: "Please provide more details",
              },
            })}
            className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
              errors.associationActivities ? "ring-2 ring-red-500" : ""
            }`}
            placeholder="Describe the activities..."
            rows="4"
          ></textarea>
        </div>
        {errors.associationActivities && (
          <p className="text-red-500 text-sm mt-1">
            {errors.associationActivities.message}
          </p>
        )}
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="activityDate"
          className="block mb-1 font-medium text-gray-700"
        >
          Date <span className="text-red-500">*</span>
        </label>
        <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
          <input
            id="activityDate"
            type="date"
            {...register("activityDate", {
              required: "Date is required",
            })}
            className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
              errors.activityDate ? "ring-2 ring-red-500" : ""
            }`}
          />
        </div>
        {errors.activityDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.activityDate.message}
          </p>
        )}
      </div>

      {/* President Signature */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          President Signature <span className="text-red-500">*</span>
        </label>
        <div className="border rounded">
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: 500,
              height: 200,
              className: "border rounded",
            }}
            ref={signaturePadRef}
          />
        </div>
        <div className="mt-2">
          <button
            type="button"
            onClick={() => signaturePadRef.current.clear()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            Clear Signature
          </button>
        </div>
        {/* Validation */}
        {/* Note: Since react-hook-form doesn't directly support the signature pad, we handle validation in onSubmit */}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#3D87E8]">
          Association Membership Registeration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Step Indicators */}
          {renderStepIndicator()}

          {/* Step Content */}
          <div>
            {/* Step 1: Association Details */}
            {step === 1 && renderAssociationDetails()}

            {/* Step 2: President Details */}
            {step === 2 && renderPresidentDetails()}

            {/* Step 3: General Secretary Details */}
            {step === 3 && renderSecretaryDetails()}

            {/* Step 4: Association Activities */}
            {step === 4 && renderAssociationActivities()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] text-white rounded hover:from-[#3ADEC2] hover:to-[#3D87E8] transition duration-200"
              >
                Previous
              </button>
            )}
            {step < 4 && (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] text-white rounded hover:from-[#3ADEC2] hover:to-[#3D87E8] transition duration-200"
              >
                Next
              </button>
            )}
            {step === 4 && (
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] text-white rounded hover:from-[#3ADEC2] hover:to-[#3D87E8] transition duration-200"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssociationForm;
