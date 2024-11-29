// VendorForm.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import SignatureCanvas from 'react-signature-canvas';
import { Country, State, City } from 'country-state-city';

// Gradient Input Component for Required Fields
const GradientInput = ({
  id,
  label,
  register,
  required = false,
  type = 'text',
  placeholder,
  errors,
  readOnly = false,
  className = '',
}) => (
  <div>
    <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-[1px] rounded">
      <input
        id={id}
        type={type}
        {...register(id, { required: required ? `${label} is required` : false })}
        className={`w-full bg-white border-none rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg ${readOnly ? 'bg-gray-100' : ''} ${className}`}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
    {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
  </div>
);

// Regular Input Component for Optional Fields (e.g., Social Media IDs)
const RegularInput = ({
  id,
  label,
  register,
  required = false,
  type = 'text',
  placeholder,
  errors,
}) => (
  <div>
    <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      type={type}
      {...register(id, { required: required ? `${label} is required` : false })}
      className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
      placeholder={placeholder}
    />
    {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
  </div>
);

// Select Field Component using react-select
const SelectField = ({
  id,
  label,
  value,
  options,
  onChange,
  required = false,
  errors,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Select
      id={id}
      value={options.find((option) => option.value === value) || null}
      onChange={onChange}
      options={options}
      isClearable
      className="mt-1"
    />
    {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
  </div>
);

// Step Indicator Component with Gradient for Active Step
const StepIndicator = ({ step }) => {
  const steps = [
    { label: 'Vendor Details', id: 1 },
    { label: 'Product/Services Details', id: 2 },
    { label: 'Association Details', id: 3 },
  ];

  return (
    <div className="flex justify-around mb-8">
      {steps.map(({ label, id }) => (
        <div key={id} className="flex flex-col items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              step === id
                ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            {id}
          </div>
          <span className={`${step === id ? 'text-blue-600' : 'text-gray-600'} mt-2 text-sm`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

// Step 1: Vendor Details (with Password)
const Step1 = ({
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  // State to track if WhatsApp number is same as Contact number
  const [sameAsContact, setSameAsContact] = useState(false);

  // Watch contactNumber to update WhatsApp number if checkbox is checked
  const contactNumber = watch('contactNumber');

  // Effect to update WhatsApp number when contactNumber changes and checkbox is checked
  useEffect(() => {
    if (sameAsContact) {
      setValue('whatsappNumber', contactNumber);
    }
  }, [contactNumber, sameAsContact, setValue]);

  // Handler for country change using react-select
  const handleCountryChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setSelectedCountry(value);
    setValue('country', value);
    setSelectedState(null);
    setValue('state', '');
    setValue('city', '');
  };

  // Handler for state change using react-select
  const handleStateChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setSelectedState(value);
    setValue('state', value);
    setValue('city', '');
  };

  // Handler for city change using react-select
  const handleCityChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setValue('city', value);
  };

  // Get state options based on selected country
  const getStateOptions = (countryCode) => {
    return State.getStatesOfCountry(countryCode).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));
  };

  // Get city options based on selected country and state
  const getCityOptions = (countryCode, stateCode) => {
    const cities = City.getCitiesOfState(countryCode, stateCode);
    return cities.map((city) => ({
      value: city.name,
      label: city.name,
    }));
  };

  // Get all countries once on component mount
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    const countries = Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountryOptions(countries);
  }, []);

  // Handler for checkbox change
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsContact(isChecked);
    if (isChecked) {
      // Set WhatsApp number to Contact number
      setValue('whatsappNumber', contactNumber);
    } else {
      // Clear WhatsApp number
      setValue('whatsappNumber', '');
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Vendor Name */}
      <GradientInput
        id="vendorName"
        label="Vendor Name/ Company Name / Shop Name"
        register={register}
        required={true}
        placeholder="Enter your vendor name"
        errors={errors}
      />

      {/* Contact Person Name */}
      <GradientInput
        id="contactPersonName"
        label="Contact Person Name"
        register={register}
        required={true}
        placeholder="Enter contact person name"
        errors={errors}
      />

      {/* Contact Number */}
      <GradientInput
        id="contactNumber"
        label="Contact Number"
        register={register}
        required={true}
        placeholder="Enter contact number"
        errors={errors}
      />

      {/* Checkbox to make WhatsApp number same as Contact number */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="sameAsContact"
          checked={sameAsContact}
          onChange={handleCheckboxChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="sameAsContact" className="text-sm text-gray-700">
          WhatsApp number same as Contact number
        </label>
      </div>

      {/* WhatsApp Number Input */}
      <GradientInput
        id="whatsappNumber"
        label="WhatsApp Number"
        register={register}
        required={true}
        placeholder="Enter WhatsApp number"
        errors={errors}
        type="text"
        readOnly={sameAsContact}
        className={sameAsContact ? 'bg-gray-100 border-none rounded px-3 py-2' : ''}
      />

      {/* Password Input */}
      <GradientInput
        id="password"
        label="Password"
        type="password"
        register={register}
        required={true}
        placeholder="Enter your password"
        errors={errors}
      />

      {/* Vendor Email */}
      <GradientInput
        id="vendorEmail"
        label="Vendor Email"
        type="email"
        register={register}
        required={true}
        placeholder="Enter vendor email"
        errors={errors}
      />

      {/* Street Name */}
      <GradientInput
        id="streetName"
        label="Street Name"
        register={register}
        required={true}
        placeholder="Enter street name"
        errors={errors}
      />

      {/* Complete Address */}
      <GradientInput
        id="address"
        label="Complete Address"
        register={register}
        required={true}
        placeholder="Enter complete address"
        errors={errors}
      />

      {/* Country Dropdown */}
      <SelectField
        id="country"
        label="Country"
        value={selectedCountry}
        options={countryOptions}
        onChange={handleCountryChange}
        required={true}
        errors={errors}
      />

      {/* State Dropdown */}
      {selectedCountry && (
        <SelectField
          id="state"
          label="State"
          value={selectedState}
          options={getStateOptions(selectedCountry)}
          onChange={handleStateChange}
          required={true}
          errors={errors}
        />
      )}

      {/* City Dropdown */}
      {selectedState && (
        <SelectField
          id="city"
          label="City"
          value={watch('city')}
          options={getCityOptions(selectedCountry, selectedState)}
          onChange={handleCityChange}
          required={true}
          errors={errors}
        />
      )}

      {/* Pincode */}
      <GradientInput
        id="pincode"
        label="Pincode"
        register={register}
        required={true}
        placeholder="Enter pincode"
        errors={errors}
      />

      {/* Google Maps Link (Optional) */}
      <RegularInput
        id="googleMapsLink"
        label="Google Maps Link"
        register={register}
        required={false}
        placeholder="https://maps.google.com/..."
        errors={errors}
      />
    </div>
  );
};

// Step 2: Product/Services Details
const Step2 = () => {
  const { register, setValue, watch, formState: { errors }, trigger } = useFormContext();
  const offerType = watch('offerType'); // Watch for the selected offer type (products or services)

  const categoryOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home_appliances', label: 'Home Appliances' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'beauty_health', label: 'Beauty & Health' },
    { value: 'food_beverage', label: 'Food & Beverage' },
    { value: 'services', label: 'Services' },
    { value: 'technology', label: 'Technology' },
    { value: 'construction_maintenance', label: 'Construction & Maintenance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'transportation_logistics', label: 'Transportation & Logistics' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'financial_services', label: 'Financial Services' },
    { value: 'arts_entertainment', label: 'Arts & Entertainment' },
    { value: 'education', label: 'Education' },
    { value: 'travel_hospitality', label: 'Travel & Hospitality' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'marketing_advertising', label: 'Marketing & Advertising' },
    { value: 'energy_utilities', label: 'Energy & Utilities' },
    { value: 'telecommunications', label: 'Telecommunications' },
    { value: 'sports_recreation', label: 'Sports & Recreation' },
    { value: 'home_improvement', label: 'Home Improvement' },
    { value: 'pet_services', label: 'Pet Services' },
    { value: 'security_services', label: 'Security Services' },
    { value: 'environmental_services', label: 'Environmental Services' },
    { value: 'fashion_apparel', label: 'Fashion & Apparel' },
    { value: 'wholesale_distributors', label: 'Wholesale Distributors' },
    { value: 'office_supplies', label: 'Office Supplies' },
    { value: 'event_management', label: 'Event Management' },
    { value: 'cleaning_janitorial', label: 'Cleaning & Janitorial' },
    { value: 'printing_services', label: 'Printing Services' },
    { value: 'nonprofit_organizations', label: 'Nonprofit Organizations' },
    { value: 'consulting_services', label: 'Consulting Services' },
  ];

  return (
    <div className="flex flex-col space-y-4">
      <SelectField
        id="category"
        label="Category"
        value={watch('category')}
        options={categoryOptions}
        onChange={(selectedOption) => {
          const value = selectedOption ? selectedOption.value : '';
          setValue('category', value);
          trigger('category'); // Trigger validation if needed
        }}
        required={true}
        errors={errors}
      />

      <div>
        <label className="font-medium">What do you offer?</label>
        <div className="flex flex-col space-y-2 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="products"
              {...register('offerType', { required: 'You must select either Products or Services' })}
              className="mr-2"
            />
            Products
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="services"
              {...register('offerType', { required: 'You must select either Products or Services' })}
              className="mr-2"
            />
            Services
          </label>
          {errors.offerType && <p className="text-red-500 text-sm">{errors.offerType.message}</p>}
        </div>
      </div>

      {/* Conditionally render input based on selection */}
      {offerType === 'products' && (
        <GradientInput
          id="productsOffered"
          label="Products Offered"
          register={register}
          required={true}
          placeholder="Describe the products offered by the vendor"
          errors={errors}
        />
      )}

      {offerType === 'services' && (
        <GradientInput
          id="servicesOffered"
          label="Services Offered"
          register={register}
          required={true}
          placeholder="Describe the services offered by the vendor"
          errors={errors}
        />
      )}

      <GradientInput
        id="discountPercentage"
        label="Discount Percentage"
        type="number"
        register={register}
        required={true}
        placeholder="Enter discount percentage"
        errors={errors}
      />
      <GradientInput
        id="discountAmount"
        label="Discount Amount"
        type="number"
        register={register}
        required={true}
        placeholder="Enter discount amount"
        errors={errors}
      />
      <GradientInput
        id="discountDetails"
        label="Discount Details"
        register={register}
        required={true}
        placeholder="Enter discount details"
        errors={errors}
      />
      <GradientInput
        id="freeOfferOn"
        label="Free Offer On"
        register={register}
        required={true}
        placeholder="Specify free offer details"
        errors={errors}
      />
      <GradientInput
        id="offerStartDate"
        label="Offer Start Date"
        type="date"
        register={register}
        required={true}
        errors={errors}
      />
      <GradientInput
        id="offerEndDate"
        label="Offer End Date"
        type="date"
        register={register}
        required={true}
        errors={errors}
      />

      <div>
        <label className="font-medium">Vendor Support to GKCC</label>
        <div className="flex flex-col space-y-2 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="donation"
              {...register('vendorSupport', { required: 'You must select a support type' })}
              className="mr-2"
            />
            Donation
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="advertisement"
              {...register('vendorSupport', { required: 'You must select a support type' })}
              className="mr-2"
            />
            Advertisement
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="commission"
              {...register('vendorSupport', { required: 'You must select a support type' })}
              className="mr-2"
            />
            Commission
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="other"
              {...register('vendorSupport', { required: 'You must select a support type' })}
              className="mr-2"
            />
            Other
          </label>
          {errors.vendorSupport && <p className="text-red-500 text-sm">{errors.vendorSupport.message}</p>}
        </div>
      </div>

      {/* Social Media Links Section */}
      <div className="my-6">
        <h3 className="text-lg font-semibold">Add Social Media Accounts ID</h3>

        <RegularInput
          id="instagramLink"
          label="Instagram"
          register={register}
          required={false}
          placeholder="Enter Instagram URL"
          errors={errors}
        />
        <RegularInput
          id="facebookLink"
          label="Facebook"
          register={register}
          required={false}
          placeholder="Enter Facebook URL"
          errors={errors}
        />
        <RegularInput
          id="linkedinLink"
          label="LinkedIn"
          register={register}
          required={false}
          placeholder="Enter LinkedIn URL"
          errors={errors}
        />
      </div>
    </div>
  );
};

// Step 3: Association Details with Confirmation and Digital Signature
const Step3 = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [customAssociation, setCustomAssociation] = useState('');

  const associations = [
    "Emirates Kokan Committee UAE",
    "Oman Kokan Welfare Association (OKWA) Oman",
    "Kokan Committee Bahrain",
    "Kokan Welfare Society, Kuwait",
    "Relief Foundation Qatar, Qatar",
    "Kokan Committee Khobar-Dammam, Dammam",
    "Kokan Committee Jubail, Jubail",
    "Kokan Committee Jeddah (KCJed), Jeddah",
    "Kokan Committee Makkah Makkah",
    "Kokan Committee Khamis Mushait, Khamis-Mushait",
    "Other", // Add 'Other' option
  ];

  // Dummy member names mapped to associations
  const members = {
    "Emirates Kokan Committee UAE": ["Alice", "Bob", "Charlie"],
    "Oman Kokan Welfare Association (OKWA) Oman": ["David", "Eva", "Frank"],
    "Kokan Committee Bahrain": ["George", "Hannah", "Isaac"],
    "Kokan Welfare Society, Kuwait": [
      "President: Aslam Thakur",
      "Vice President: Mufti Hamza Mujawar",
      "Vice President: Labib Abbas Fakih",
      "General Secretary: Parvez Hussain Wadekar",
      "Joint Gen.Secretary: Faisal Mohammed Kasim Jogilkar",
      "Joint Gen.Secretary: Amanullah Abbas Yelukar​ ",
      "Treasurer: Mohammed Shafi Alware",
      "Joint Treasurer: Atif Azim Khanzada",
      "Joint Treasurer: Talib Ali Rumaney",
      "Executive Member: Rahmatullah Galsoorker",
      "Executive Member: Maulana Javed Karjikar",
      "Executive Member: Yaqub Abdul Latif Solkar",
      "Executive Member: Hasrat Murad Walile",
      "Executive Member: Anwar Ayyub Mhalukar",
      "Executive Member: Kifayat Ali Giyasuddin Tisekar",
      "Executive Member: Mohammed Salim Kazi",
      "Executive Member: Ridwan Abdul Rahman Mullaji",
      "Executive Member: Nasar Jainuddin Parkar",
      "Executive Member: Mohamed Saeed Ali Mullaji",
      "Executive Member: Abrar Amanullah Shirshikar",
      "Executive Member: Mansur Ibrahim Dalwai",
      "Executive Member: Hafiz Samiulla Abdulla Firfire",
      "Executive Member: Ruksana Labib Fakih",
      "Executive Member: Humera Parvez Wadekar",
      "Ex-Offcio President: Salim Umar Desai",
      "Patron: Mohammed Saleh Burud",
      "Advisor: Maulana Nisar Daroge",
      "Advisor: Abdul Razzak Rumane",
    ],
    "Relief Foundation Qatar, Qatar": ["Mona", "Nina", "Omar"],
    "Kokan Committee Khobar-Dammam, Dammam": ["Paul", "Quinn", "Ray"],
    "Kokan Committee Jubail, Jubail": ["Sara", "Tom", "Uma"],
    "Kokan Committee Jeddah (KCJed), Jeddah": [
      "President: Ismail Wangde",
      "Vice President: AbdulGhani Deshmukh",
      "General Secretary: Rafique Kundlik",
      "Treasurer: Zafar Baig",
      "Project Director: Faiz Rakhange",
      "Executive Member: Aslam Mukadam",
      "Executive Member: Ishrat Parkar",
      "Executive Member: Akbar Khan",
      "Executive Member: Hussein Chougule",
      "Executive Member: Zahid Chougule",
      "Executive Member: Naved Qadri",
    ],
    "Kokan Committee Makkah Makkah": ["Yara", "Zane", "Aaron"],
    "Kokan Committee Khamis Mushait, Khamis-Mushait": ["Bella", "Cody", "Daisy"],
  };

  // Prepare options for the SelectField
  const associationOptions = associations.map((association) => ({
    value: association,
    label: association,
  }));

  // Prepare member options based on selected association
  const memberOptions =
    selectedAssociation && selectedAssociation !== "Other"
      ? members[selectedAssociation].map((member) => ({
          value: member,
          label: member,
        }))
      : [];

  // Reference for the Signature Canvas and Container
  const sigCanvasRef = useRef({});
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 630, height: 200 });

  // Handle association change
  const handleAssociationChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setSelectedAssociation(value);
    setValue('association', value);

    if (value !== "Other") {
      setCustomAssociation(''); // Reset custom association if a predefined one is selected
      setValue('customAssociation', '');
    }
  };

  // Handle member selection
  const handleMemberChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setValue('associationMember', value);
  };

  // Handle custom association input change
  const handleCustomAssociationChange = (e) => {
    const value = e.target.value;
    setCustomAssociation(value);
    setValue('customAssociation', value);
  };

  // Capture the signature as a data URL when the signature pad changes
  const handleEnd = () => {
    if (!sigCanvasRef.current.isEmpty()) {
      const signatureData = sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png');
      setValue('signature', signatureData, { shouldValidate: true });
    } else {
      setValue('signature', '', { shouldValidate: true });
    }
  };

  // Clear the signature pad
  const clearSignature = () => {
    sigCanvasRef.current.clear();
    setValue('signature', '', { shouldValidate: true });
  };

  // Dynamic Canvas Sizing for Responsiveness
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const maxWidth = 630; // Maximum canvas width
        const minWidth = 300; // Minimum canvas width for smaller screens
        const newWidth = Math.min(Math.max(containerWidth, minWidth), maxWidth);
        const aspectRatio = 200 / 630; // Maintain aspect ratio
        const newHeight = newWidth * aspectRatio;
        setCanvasSize({ width: newWidth, height: newHeight });
      }
    };

    // Initial size
    updateCanvasSize();

    // Update on window resize
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      {/* Association Selection */}
      <SelectField
        id="association"
        label="Select an Association"
        value={selectedAssociation}
        options={associationOptions}
        onChange={handleAssociationChange}
        required={true}
        errors={errors}
      />

      {/* Show custom association input if 'Other' is selected */}
      {selectedAssociation === "Other" && (
        <GradientInput
          id="customAssociation"
          label="Please specify the Association Member"
          register={register}
          required={true}
          placeholder="Enter custom association"
          errors={errors}
        />
      )}

      {/* Render member dropdown if an association is selected and not 'Other' */}
      {selectedAssociation && selectedAssociation !== "Other" && (
        <SelectField
          id="associationMember"
          label="Select Association Member"
          value={watch('associationMember')}
          options={memberOptions}
          onChange={handleMemberChange}
          required={true}
          errors={errors}
        />
      )}

      {/* Confirmation Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="confirmation"
          {...register('confirmation', { required: 'You must confirm that all details are correct' })}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="confirmation" className="text-sm text-gray-700">
          I confirm that all details are correct.
        </label>
      </div>
      {errors.confirmation && <p className="text-red-500 text-sm">{errors.confirmation.message}</p>}

      {/* Digital Signature Input */}
      <div className="w-full">
        <label htmlFor="signature" className="block mb-2 font-medium text-gray-700">
          Vendor Signature <span className="text-red-500">*</span>
        </label>
        <div ref={containerRef} className="bg-gradient-to-r from-blue-500 to-teal-400 p-[1px] rounded w-full">
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: canvasSize.width,
              height: canvasSize.height,
              className: 'rounded bg-white w-full h-full',
            }}
            ref={sigCanvasRef}
            onEnd={handleEnd}
          />
        </div>
        <button
          type="button"
          onClick={clearSignature}
          className="mt-2 text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 w-full sm:w-auto"
        >
          Clear Signature
        </button>
        {!watch('signature') && (
          <p className="text-red-500 text-sm mt-1">Digital Signature is required.</p>
        )}
      </div>
    </div>
  );
};

// VendorForm Component
const VendorForm = () => {
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', or null

  const methods = useForm({
    mode: 'onChange',
  });

  const { handleSubmit, trigger, formState: { errors }, getValues } = methods;

  const [formData, setFormData] = useState({}); // State to hold form data

  const nextStep = async () => {
    // Trigger validation for current step
    const isValid = await trigger();

    if (isValid) {
      // Save the current form data to state before proceeding
      setFormData({ ...formData, ...getValues() });
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    // Decrement the step
    setStep((prev) => prev - 1);
    // Reset form values to saved data
    methods.reset(formData);
  };

  const onSubmit = async (data) => {
    // Combine all form data
    const finalData = { ...formData, ...data };

    // Create FormData object
    const formDataToSend = new FormData();

    // Append all fields to FormData
    for (const key in finalData) {
      if (finalData.hasOwnProperty(key)) {
        if (key === 'signature') {
          // Convert base64 signature to Blob and append
          const response = await fetch(finalData[key]);
          const blob = await response.blob();
          formDataToSend.append('signature', blob, 'signature.png');
        } else {
          formDataToSend.append(key, finalData[key]);
        }
      }
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/vendor/addvendor`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmissionStatus('success');
        // Optionally, reset the form or redirect the user
        methods.reset();
        alert("Form submitted successfully!");
        setFormData({});
        setStep(1);
      } else {
        setSubmissionStatus('error');
        console.error('Server responded with an error:', response.statusText);
      }
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 p-4 overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-600">Vendor Registration</h1>
        <div className="bg-white shadow-lg rounded-lg p-9">
          <StepIndicator step={step} />
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && (
                <Step1
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  selectedState={selectedState}
                  setSelectedState={setSelectedState}
                />
              )}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}

              <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="py-3 px-6 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Previous
                  </button>
                )}
                {step < 3 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="py-3 px-6 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Next
                  </button>
                )}
                {step === 3 && (
                  <button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Submit
                  </button>
                )}
              </div>

              {/* Submission Feedback */}
              {submissionStatus === 'success' && (
                <p className="text-green-500 text-center mt-4">Form submitted successfully!</p>
              )}
              {submissionStatus === 'error' && (
                <p className="text-red-500 text-center mt-4">There was an error submitting the form. Please try again.</p>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default VendorForm;
