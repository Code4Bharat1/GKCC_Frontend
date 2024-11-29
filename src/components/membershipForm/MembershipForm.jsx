// src/components/membershipForm/MembershipForm.jsx
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch, Controller } from "react-hook-form";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import axios from "axios"; // Import Axios for API calls

// Import District JSON Files for Native Address (Step 3)
import raigad from "../../data/districts/raigad.json";
import thane from "../../data/districts/thane.json";
import sindhudurg from "../../data/districts/sindhudurg.json";
import ratnagiri from "../../data/districts/ratnagiri.json";
import palghar from "../../data/districts/palghar.json";
import mumbai from "../../data/districts/mumbai.json";

// Reusable Gradient Input Component
const GradientInput = ({
  id,
  label,
  register,
  required,
  pattern,
  minLength,
  type = "text",
  placeholder = "",
  errors,
  disabled = false,
  readOnly = false,
}) => (
  <div className="mb-4">
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
        readOnly={readOnly}
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

const MembershipForm = () => {
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

  const router = useRouter();

  const [step, setStep] = useState(1); // Current form step
  const [isSameAsMobile, setIsSameAsMobile] = useState(false); // Checkbox state

  // Watch specific fields
  const mobileNumber = watch("mobileNumber");
  const maritalStatus = watch("maritalStatus"); // Watch Marital Status
  const childrenCount = watch("children"); // Watch Number of Children

  // State for District and Area (used in Native Address - Step 3)
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [availableAreas, setAvailableAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");

  // State for dynamic child name fields
  const [childNames, setChildNames] = useState([]);

  // State for International Address (Step 2)
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // State for Associations
  const [associations, setAssociations] = useState([]); // List of associations from API
  const [isLoadingAssociations, setIsLoadingAssociations] = useState(false); // Loading state
  const [associationError, setAssociationError] = useState(null); // Error state

  // Map Districts to Their Data
  const districtDataMap = {
    Raigad: raigad,
    Thane: thane,
    Sindhudurg: sindhudurg,
    Ratnagiri: ratnagiri,
    Palghar: palghar,
    Mumbai: mumbai,
    // Add other districts as needed
  };

  // Populate Country Options on Mount
  useEffect(() => {
    const countries = Country.getAllCountries();
    const formattedCountries = countries.map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountryOptions(formattedCountries);
  }, []);

  // Fetch Associations from API on Mount
  useEffect(() => {
    const fetchAssociations = async () => {
      setIsLoadingAssociations(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/association/getAllAssociationNames`
        );

        if (
          response.data &&
          response.data.success &&
          response.data.statusCode === 200
        ) {
          const fetchedAssociations = response.data.data.map((assoc) => ({
            value: assoc.associationName,
            label: assoc.associationName,
          }));
          setAssociations(fetchedAssociations);
          setAssociationError(null);
        } else {
          setAssociationError("Failed to fetch associations.");
        }
      } catch (error) {
        console.error("Error fetching associations:", error);
        setAssociationError("An error occurred while fetching associations.");
      } finally {
        setIsLoadingAssociations(false);
      }
    };

    fetchAssociations();
  }, []);

  // Update State Options when Country changes
  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value);
      const formattedStates = states.map((state) => ({
        value: state.isoCode,
        label: state.name,
      }));
      setStateOptions(formattedStates);
    } else {
      setStateOptions([]);
      setSelectedState(null);
      setCityOptions([]);
      setSelectedCity(null);
      setValue("internationalStateProvince", "");
      setValue("internationalCity", "");
    }
  }, [selectedCountry, setValue]);

  // Update City Options when State changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const cities = City.getCitiesOfState(
        selectedCountry.value,
        selectedState.value
      );
      const formattedCities = cities.map((city) => ({
        value: city.name,
        label: city.name,
      }));
      setCityOptions(formattedCities);
    } else {
      setCityOptions([]);
      setSelectedCity(null);
      setValue("internationalCity", "");
    }
  }, [selectedCountry, selectedState, setValue]);

  // Update the number of child name fields when children count or marital status changes
  useEffect(() => {
    if (maritalStatus !== "Single" && childrenCount > 0) {
      // Ensure childrenCount does not exceed 20
      const validChildrenCount = Math.min(childrenCount, 20);

      const newChildNames = Array.from(
        { length: validChildrenCount },
        (_, index) => ({
          name: `childName${index + 1}`,
          label: `Name of Child ${index + 1}`,
        })
      );

      // Determine which fields are being removed
      if (childNames.length > validChildrenCount) {
        const removedFields = childNames
          .slice(validChildrenCount)
          .map((child) => child.name);
        unregister(removedFields);
      }

      setChildNames(newChildNames);
    } else {
      // If childrenCount is 0 or maritalStatus is Single, unregister all childName fields
      const allChildNames = childNames.map((child) => child.name);
      unregister(allChildNames);
      setChildNames([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenCount, maritalStatus]);

  // Helper function to render dynamic child name fields
  const renderChildNameFields = () => {
    return childNames.map((child, index) => (
      <GradientInput
        key={child.name}
        id={child.name}
        label={child.label}
        register={register}
        required={true}
        pattern={{
          value: /^[A-Za-z\s]+$/,
          message: "Child's name can only contain letters and spaces",
        }}
        errors={errors}
        placeholder={`Enter ${child.label}`}
      />
    ));
  };

  // Retrieve stored form data and step from localStorage after component mounts
  useEffect(() => {
    // Check if window is defined to ensure code runs only on client-side
    if (typeof window !== "undefined") {
      try {
        const storedFormData = JSON.parse(
          localStorage.getItem("membershipFormData")
        );
        const storedStep = parseInt(
          localStorage.getItem("membershipFormStep"),
          10
        );

        if (storedFormData) {
          // Iterate over stored form data and set each field
          Object.keys(storedFormData).forEach((field) => {
            setValue(field, storedFormData[field]);
          });

          // If WhatsApp number is same as mobile number, update the checkbox state
          if (
            storedFormData.whatsappNumber &&
            storedFormData.whatsappNumber === storedFormData.mobileNumber
          ) {
            setIsSameAsMobile(true);
          }

          // Restore selectedCountry, selectedState, and selectedCity if available
          if (storedFormData.internationalCountry) {
            const country = countryOptions.find(
              (c) => c.label === storedFormData.internationalCountry
            );
            if (country) setSelectedCountry(country);
          }
          if (storedFormData.internationalStateProvince) {
            const state = stateOptions.find(
              (s) => s.label === storedFormData.internationalStateProvince
            );
            if (state) setSelectedState(state);
          }
          if (storedFormData.internationalCity) {
            const city = cityOptions.find(
              (c) => c.label === storedFormData.internationalCity
            );
            if (city) setSelectedCity(city);
          }
        }

        if (storedStep && storedStep >= 1 && storedStep <= 4) {
          setStep(storedStep);
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryOptions, stateOptions, cityOptions]); // Added dependencies to ensure countries are loaded

  // Synchronize WhatsApp Number with Mobile Number when checkbox is checked
  useEffect(() => {
    if (isSameAsMobile) {
      setValue("whatsappNumber", mobileNumber || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileNumber, isSameAsMobile]);

  // Clear Spouse and Children fields if Marital Status is Single
  useEffect(() => {
    if (maritalStatus === "Single") {
      setValue("spouseName", "");
      setValue("children", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maritalStatus]);

  // Update available areas when district changes (used in Native Address - Step 3)
  useEffect(() => {
    if (selectedDistrict) {
      const areas = districtDataMap[selectedDistrict] || [];
      setAvailableAreas(areas);
      setSelectedArea(""); // Reset Area selection
      setValue("area", ""); // Reset Area field
      setValue("nativePincode", ""); // Reset Pincode field
    } else {
      setAvailableAreas([]);
      setSelectedArea("");
      setValue("area", "");
      setValue("nativePincode", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict]);

  // Update pincode when area changes (used in Native Address - Step 3)
  useEffect(() => {
    if (selectedArea) {
      const areaObj = availableAreas.find((area) => area.area === selectedArea);
      if (areaObj) {
        setValue("nativePincode", areaObj.pincode);
      } else {
        setValue("nativePincode", "");
      }
    } else {
      setValue("nativePincode", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArea]);

  // Watch all form fields for localStorage synchronization
  const watchedFields = useWatch({
    control,
  });

  // Persist form data and step to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "membershipFormData",
          JSON.stringify(watchedFields)
        );
        localStorage.setItem("membershipFormStep", step);
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [watchedFields, step]);

  const onSubmit = async (data, reset) => {
    console.log("Form Data:", data);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/member/Submitmemberform`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        // Handle success
        console.log("Form submitted successfully:", response.data);

        // Show success notification
        toast.success("Form submitted successfully!", {
          autoClose: 3000, // Auto close after 3 seconds
        });

        localStorage.removeItem("membershipFormData");
        localStorage.removeItem("membershipFormStep");

        // Redirect to home after submission
        setTimeout(() => {
          router.push("/");
        }, 3000); // Wait for toast to finish before redirecting
      } else {
        // Handle unexpected response status
        console.error("Form submission error:", response.data);

        // Show error notification
        toast.error("Form submission failed. Please try again.", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);

      // Show error notification
      toast.error("An error occurred. Please try again.", {
        autoClose: 3000,
      });
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
          "association",
          "firstName",
          "middleName",
          "familyName", // Surname
          "email",
          "password",
          "dob",
          "bloodGroup",
          "education",
          "mobileNumber",
          "whatsappNumber",
          "gender",
          "maritalStatus",
        ];
      case 2:
        return [
          "internationalCountry",
          "internationalStateProvince",
          "internationalCity",
          "internationalStreetAddress",
          "internationalFlat",
          "internationalBlock",
          "internationalPostalCode",
        ];
      case 3:
        return [
          "nativeFlat",
          "nativeBlock",
          "district",
          "area",
          "nativePincode",
          "nativeCity",
          "nativeState",
        ];
      case 4:
        // Conditional Fields: Include spouseName and children only if Marital Status is not Single
        const baseFields = ["fatherName", "motherName"];
        const spouseFields =
          maritalStatus !== "Single" ? ["spouseName", "children"] : [];
        const childNameFields = childNames.map((child) => child.name);
        return [...baseFields, ...spouseFields, ...childNameFields];
      default:
        return [];
    }
  };

  // Helper function to render step indicators as a timeline
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
                className={`mt-1 text-xs ${
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
        return "Personal Details";
      case 2:
        return "International Address";
      case 3:
        return "Native Address";
      case 4:
        return "Family Details";
      default:
        return "";
    }
  };

  // Render Step 4: Family Details
  const renderFamilyDetails = () => (
    <div>
      <div className="space-y-4">
        {/* Father's Name */}
        <GradientInput
          id="fatherName"
          label="Father's Name"
          register={register}
          required={true}
          pattern={{
            value: /^[A-Za-z\s]+$/,
            message: "Father's Name can only contain letters and spaces",
          }}
          minLength={{
            value: 2,
            message: "Father's Name must be at least 2 characters",
          }}
          errors={errors}
          placeholder="Enter Father's Name"
        />

        {/* Mother's Name */}
        <GradientInput
          id="motherName"
          label="Mother's Name"
          register={register}
          required={true}
          pattern={{
            value: /^[A-Za-z\s]+$/,
            message: "Mother's Name can only contain letters and spaces",
          }}
          minLength={{
            value: 2,
            message: "Mother's Name must be at least 2 characters",
          }}
          errors={errors}
          placeholder="Enter Mother's Name"
        />

        {/* Conditionally Render Spouse's Name and Number of Children */}
        {maritalStatus !== "Single" && (
          <>
            {/* Spouse's Name */}
            <GradientInput
              id="spouseName"
              label="Spouse's Name"
              register={register}
              required={true}
              pattern={{
                value: /^[A-Za-z\s]+$/,
                message: "Spouse's Name can only contain letters and spaces",
              }}
              minLength={{
                value: 2,
                message: "Spouse's Name must be at least 2 characters",
              }}
              errors={errors}
              placeholder="Enter Spouse's Name"
            />

            {/* Number of Children */}
            <div>
              <label
                htmlFor="children"
                className="block mb-1 font-medium text-gray-700"
              >
                Number of Children <span className="text-red-500">*</span>
              </label>
              <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
                <input
                  id="children"
                  type="number"
                  {...register("children", {
                    required: "Number of Children is required",
                    min: {
                      value: 0,
                      message: "Number of Children cannot be negative",
                    },
                    max: {
                      value: 20,
                      message:
                        "Maximum number of children can be entered is 20",
                    },
                    validate: {
                      isInteger: (value) =>
                        Number.isInteger(Number(value)) ||
                        "Number of Children must be an integer",
                    },
                  })}
                  className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
                    errors.children ? "ring-2 ring-red-500" : ""
                  }`}
                  placeholder="Enter Number of Children"
                  min="0"
                  max="20" // Set max attribute to 20
                />
              </div>
              {errors.children && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.children.message}
                </p>
              )}
            </div>

            {/* Render dynamic child name fields */}
            {childrenCount > 0 && renderChildNameFields()}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-[#3D87E8]">
          Individual Membership Registration
        </h2>

        {/* Disclaimer Note */}
        <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p className="text-sm">
            <strong>Disclaimer:</strong> To fill out this form, you must already
            be associated with one of the listed associations. Please ensure you
            are a member before proceeding with the application.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Step Indicators */}
          {renderStepIndicator()}

          {/* Step Content */}
          <div>
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div>
                {/* Select an Association */}
                <div className="mb-4">
                  <label
                    htmlFor="association"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Select an Association{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  {/* Handle Loading and Error States */}
                  {isLoadingAssociations ? (
                    <p className="text-blue-500">Loading associations...</p>
                  ) : associationError ? (
                    <p className="text-red-500">{associationError}</p>
                  ) : (
                    <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
                      <select
                        id="association"
                        {...register("association", {
                          required: "Association selection is required",
                        })}
                        className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
                          errors.association ? "ring-2 ring-red-500" : ""
                        }`}
                        disabled={isLoadingAssociations || associationError}
                      >
                        <option value="">Select an Association</option>
                        {associations.map((assoc) => (
                          <option key={assoc.value} value={assoc.value}>
                            {assoc.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {errors.association && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.association.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  {/* First Name */}
                  <GradientInput
                    id="firstName"
                    label="First Name"
                    register={register}
                    required={true}
                    pattern={{
                      value: /^[A-Za-z\s]+$/,
                      message: "First name can only contain letters and spaces",
                    }}
                    minLength={{
                      value: 2,
                      message: "First name must be at least 2 characters",
                    }}
                    errors={errors}
                    placeholder="Enter your first name"
                  />

                  {/* Middle Name */}
                  <GradientInput
                    id="middleName"
                    label="Middle Name"
                    register={register}
                    required={true}
                    pattern={{
                      value: /^[A-Za-z\s]+$/,
                      message:
                        "Middle name can only contain letters and spaces",
                    }}
                    minLength={{
                      value: 2,
                      message: "Middle name must be at least 2 characters",
                    }}
                    errors={errors}
                    placeholder="Enter your middle name"
                  />

                  {/* Family Name (Surname) */}
                  <GradientInput
                    id="familyName"
                    label="Family Name (Surname)"
                    register={register}
                    required={true}
                    pattern={{
                      value: /^[A-Za-z\s]+$/,
                      message:
                        "Family name can only contain letters and spaces",
                    }}
                    minLength={{
                      value: 2,
                      message: "Family name must be at least 2 characters",
                    }}
                    errors={errors}
                    placeholder="Enter your family name"
                  />

                  {/* Email */}
                  <GradientInput
                    id="email"
                    label="Email"
                    register={register}
                    required={true}
                    pattern={{
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    }}
                    errors={errors}
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    type="password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  {/* Password Guidance */}
                  <p className="text-gray-500 text-sm mt-1">
                    Password must be at least 8 characters and include
                    uppercase, lowercase, number, and special character.
                  </p>

                  {/* DOB */}
                  <div>
                    <label
                      htmlFor="dob"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
                      <input
                        id="dob"
                        type="date"
                        {...register("dob", {
                          required: "Date of Birth is required",
                          validate: {
                            isAdult: (value) => {
                              const today = new Date();
                              const dob = new Date(value);
                              let age = today.getFullYear() - dob.getFullYear();
                              const m = today.getMonth() - dob.getMonth();
                              if (
                                m < 0 ||
                                (m === 0 && today.getDate() < dob.getDate())
                              ) {
                                age--;
                              }
                              return (
                                age >= 21 || "You must be at least 21 years old"
                              );
                            },
                          },
                        })}
                        className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
                          errors.dob ? "ring-2 ring-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.dob && errors.dob.type === "required" && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dob.message}
                      </p>
                    )}
                    {errors.dob && errors.dob.type === "isAdult" && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dob.message}
                      </p>
                    )}
                  </div>

                  {/* Blood Group */}
                  <div>
                    <label
                      htmlFor="bloodGroup"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Blood Group <span className="text-red-500">*</span>
                    </label>
                    <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
                      <select
                        id="bloodGroup"
                        {...register("bloodGroup", {
                          required: "Blood Group is required",
                        })}
                        className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
                          errors.bloodGroup ? "ring-2 ring-red-500" : ""
                        }`}
                      >
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    {errors.bloodGroup && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.bloodGroup.message}
                      </p>
                    )}
                  </div>

                  {/* Educational Qualification */}
                  <GradientInput
                    id="education"
                    label="Educational Qualification"
                    register={register}
                    required={true}
                    minLength={{
                      value: 2,
                      message:
                        "Educational Qualification must be at least 2 characters",
                    }}
                    errors={errors}
                    placeholder="Enter your highest qualification"
                  />

                  {/* Mobile Number */}
                  <GradientInput
                    id="mobileNumber"
                    label="Mobile Number"
                    register={register}
                    required={true}
                    pattern={{
                      value: /^\+?[0-9]{4,15}$/,
                      message:
                        "Invalid mobile number. It should contain between 4 to 15 digits and + special character.",
                    }}
                    errors={errors}
                    placeholder="Enter your mobile number"
                    type="tel"
                  />

                  {/* WhatsApp Number */}
                  <div>
                    <label
                      htmlFor="whatsappNumber"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
                      <input
                        id="whatsappNumber"
                        type="tel"
                        {...register("whatsappNumber", {
                          required: "WhatsApp number is required",
                          pattern: {
                            value: /^\+?[0-9]{4,15}$/,
                            message:
                              "Invalid WhatsApp number. It should contain between 4 to 15 digits.",
                          },
                        })}
                        className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
                          errors.whatsappNumber ? "ring-2 ring-red-500" : ""
                        }`}
                        placeholder="Enter your WhatsApp number"
                        disabled={isSameAsMobile} // Disable input if checkbox is checked
                      />
                    </div>
                    {errors.whatsappNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.whatsappNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Checkbox for WhatsApp Number Same as Mobile Number */}
                  <div className="flex items-center">
                    <input
                      id="sameAsMobile"
                      type="checkbox"
                      checked={isSameAsMobile}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setIsSameAsMobile(checked);
                        if (checked) {
                          setValue("whatsappNumber", mobileNumber || "");
                        } else {
                          setValue("whatsappNumber", "");
                        }
                      }}
                      className="h-4 w-4 text-[#3D87E8] focus:ring-[#3D87E8] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="sameAsMobile"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      WhatsApp number is same as mobile number
                    </label>
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
                      <select
                        id="gender"
                        {...register("gender", {
                          required: "Gender is required",
                        })}
                        className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
                          errors.gender ? "ring-2 ring-red-500" : ""
                        }`}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>

                  {/* Marital Status */}
                  <div>
                    <label
                      htmlFor="maritalStatus"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Marital Status <span className="text-red-500">*</span>
                    </label>
                    <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
                      <select
                        id="maritalStatus"
                        {...register("maritalStatus", {
                          required: "Marital Status is required",
                        })}
                        className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
                          errors.maritalStatus ? "ring-2 ring-red-500" : ""
                        }`}
                      >
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                    {errors.maritalStatus && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.maritalStatus.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: International Address */}
            {step === 2 && (
              <div>
                <div className="space-y-4">
                  {/* Country */}
                  <div>
                    <label
                      htmlFor="internationalCountry"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Country <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="internationalCountry"
                      control={control}
                      rules={{ required: "Country is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="internationalCountry"
                          options={countryOptions}
                          onChange={(selectedOption) => {
                            field.onChange(
                              selectedOption ? selectedOption.label : ""
                            );
                            setSelectedCountry(selectedOption);
                            // Reset State and City when Country changes
                            setSelectedState(null);
                            setSelectedCity(null);
                            setValue("internationalStateProvince", "");
                            setValue("internationalCity", "");
                          }}
                          value={
                            selectedCountry
                              ? {
                                  value: selectedCountry.value,
                                  label: selectedCountry.label,
                                }
                              : null
                          }
                          placeholder="Select Country"
                          isClearable
                          className="basic-single"
                          classNamePrefix="select"
                        />
                      )}
                    />
                    {errors.internationalCountry && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.internationalCountry.message}
                      </p>
                    )}
                  </div>

                  {/* State/Province */}
                  <div>
                    <label
                      htmlFor="internationalStateProvince"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      State/Province <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="internationalStateProvince"
                      control={control}
                      rules={{ required: "State/Province is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="internationalStateProvince"
                          options={stateOptions}
                          onChange={(selectedOption) => {
                            field.onChange(
                              selectedOption ? selectedOption.label : ""
                            );
                            setSelectedState(selectedOption);
                            // Reset City when State changes
                            setSelectedCity(null);
                            setValue("internationalCity", "");
                          }}
                          value={
                            selectedState
                              ? {
                                  value: selectedState.value,
                                  label: selectedState.label,
                                }
                              : null
                          }
                          placeholder="Select State/Province"
                          isClearable
                          isDisabled={!selectedCountry}
                          className="basic-single"
                          classNamePrefix="select"
                        />
                      )}
                    />
                    {errors.internationalStateProvince && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.internationalStateProvince.message}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="internationalCity"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="internationalCity"
                      control={control}
                      rules={{ required: "City is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="internationalCity"
                          options={cityOptions}
                          onChange={(selectedOption) => {
                            field.onChange(
                              selectedOption ? selectedOption.label : ""
                            );
                            setSelectedCity(selectedOption);
                          }}
                          value={
                            selectedCity
                              ? {
                                  value: selectedCity.value,
                                  label: selectedCity.label,
                                }
                              : null
                          }
                          placeholder="Select City"
                          isClearable
                          isDisabled={!selectedState}
                          className="basic-single"
                          classNamePrefix="select"
                        />
                      )}
                    />
                    {errors.internationalCity && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.internationalCity.message}
                      </p>
                    )}
                  </div>

                  {/* Street Address */}
                  <GradientInput
                    id="internationalStreetAddress"
                    label="Street Address"
                    register={register}
                    required={true}
                    minLength={{
                      value: 5,
                      message: "Street Address must be at least 5 characters",
                    }}
                    errors={errors}
                    placeholder="Enter Street Address"
                  />

                  {/* Flat and Floor No */}
                  <GradientInput
                    id="internationalFlat"
                    label="Flat and Floor No"
                    register={register}
                    required={true}
                    minLength={{
                      value: 2,
                      message:
                        "Flat and Floor No must be at least 2 characters",
                    }}
                    errors={errors}
                    placeholder="e.g., Flat 5, Floor 2"
                  />

                  {/* Block No */}
                  <GradientInput
                    id="internationalBlock"
                    label="Address"
                    register={register}
                    required={true}
                    minLength={{
                      value: 1,
                      message: "Address must be at least 1 character",
                    }}
                    errors={errors}
                    placeholder="Enter Block No"
                  />

                  {/* Postal Code */}
                  <div>
                    <label
                      htmlFor="internationalPostalCode"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Postal Code
                    </label>
                    <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
                      <input
                        id="internationalPostalCode"
                        type="text"
                        {...register("internationalPostalCode", {
                          pattern: {
                            value: /^[A-Za-z0-9- ]{3,10}$/,
                            message:
                              "Invalid postal code. It should be 3 to 10 alphanumeric characters.",
                          },
                        })}
                        className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
                          errors.internationalPostalCode
                            ? "ring-2 ring-red-500"
                            : ""
                        }`}
                        placeholder="Enter Postal Code"
                      />
                    </div>
                    {errors.internationalPostalCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.internationalPostalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Native Address */}
            {step === 3 && (
              <div>
                <div className="space-y-4">
                  {/* Flat and Floor No */}
                  <GradientInput
                    id="nativeFlat"
                    label="Flat and Floor No"
                    register={register}
                    required={true}
                    minLength={{
                      value: 2,
                      message:
                        "Flat and Floor No must be at least 2 characters",
                    }}
                    errors={errors}
                    placeholder="e.g., Flat 3, Floor 1"
                  />

                  {/* Block No */}
                  <GradientInput
                    id="nativeBlock"
                    label="Address"
                    register={register}
                    required={true}
                    minLength={{
                      value: 1,
                      message: "Address must be at least 1 character",
                    }}
                    errors={errors}
                    placeholder="Enter Block No"
                  />

                  {/* District Dropdown */}
                  <div>
                    <label
                      htmlFor="district"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      District <span className="text-red-500">*</span>
                    </label>
                    <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
                      <select
                        id="district"
                        {...register("district", {
                          required: "District is required",
                        })}
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
                          errors.district ? "ring-2 ring-red-500" : ""
                        }`}
                      >
                        <option value="">Select District</option>
                        {Object.keys(districtDataMap).map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.district && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.district.message}
                      </p>
                    )}
                  </div>

                  {/* Area Select (Searchable Dropdown) */}
                  <div>
                    <label
                      htmlFor="area"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Area <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="area"
                      control={control}
                      rules={{ required: "Area is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="area"
                          options={availableAreas.map((area) => ({
                            value: area.area,
                            label: area.area,
                          }))}
                          onChange={(selectedOption) => {
                            field.onChange(
                              selectedOption ? selectedOption.value : ""
                            );
                            setSelectedArea(
                              selectedOption ? selectedOption.value : ""
                            );
                          }}
                          value={
                            selectedArea
                              ? { value: selectedArea, label: selectedArea }
                              : null
                          }
                          isDisabled={!selectedDistrict}
                          placeholder={
                            selectedDistrict
                              ? "Select Area"
                              : "Select District First"
                          }
                          isClearable
                          className="basic-single"
                          classNamePrefix="select"
                        />
                      )}
                    />
                    {/* Handle validation errors */}
                    {errors.area && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.area.message}
                      </p>
                    )}
                  </div>

                  {/* Pincode (Auto-filled) */}
                  <div>
                    <label
                      htmlFor="nativePincode"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
                      <input
                        id="nativePincode"
                        type="text"
                        {...register("nativePincode", {
                          required: "Pincode is required",
                          pattern: {
                            value: /^\d{5,10}$/,
                            message:
                              "Invalid pincode. It should be 5 to 10 digits.",
                          },
                        })}
                        className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
                          errors.nativePincode ? "ring-2 ring-red-500" : ""
                        }`}
                        placeholder="Enter Pincode"
                        value={watch("nativePincode") || ""}
                        readOnly
                      />
                    </div>
                    {errors.nativePincode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nativePincode.message}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <GradientInput
                    id="nativeCity"
                    label="City"
                    register={register}
                    required={true}
                    minLength={{
                      value: 2,
                      message: "City must be at least 2 characters",
                    }}
                    errors={errors}
                    placeholder="Enter City"
                  />

                  {/* State */}
                  <div>
                    <label
                      htmlFor="nativeState"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      State <span className="text-red-500">*</span>
                    </label>
                    <div className="bg-gradient-to-r from-[#3D87E8] to-[#3ADEC2] p-[1px] rounded">
                      <input
                        id="nativeState"
                        type="text"
                        {...register("nativeState", {
                          required: "State is required",
                          minLength: {
                            value: 2,
                            message: "State must be at least 2 characters",
                          },
                        })}
                        className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D87E8] shadow-lg ${
                          errors.nativeState ? "ring-2 ring-red-500" : ""
                        }`}
                        value={watch("nativeState") || "Maharashtra"}
                        readOnly
                      />
                    </div>
                    {errors.nativeState && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nativeState.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Family Details */}
            {step === 4 && renderFamilyDetails()}
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

export default MembershipForm;
