import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EasyIcon from "./IconRenderer";

interface FormField {
  id: number;
  label: string;
  field_type: string;
  placeholder: string;
  required: boolean;
  choices: string[];
  order: number;
}

interface WebFormData {
  heading: string;
  description: string;
  form: {
    id: number;
    name: string;
    form_title: string;
    form_description: string;
    success_message: string;
    button_text: string;
    fields: FormField[];
  };
}

interface WebFormProps {
  isOpen: boolean;
  onClose: () => void;
  data: WebFormData;
}

const countries = [
  { code: "+1", name: "US", flag: "US" },
  { code: "+86", name: "CN", flag: "CN" },
  { code: "+91", name: "IN", flag: "IN" },
  { code: "+62", name: "ID", flag: "ID" },
  { code: "+92", name: "PK", flag: "PK" },
  { code: "+55", name: "BR", flag: "BR" },
  { code: "+234", name: "NG", flag: "NG" },
  { code: "+880", name: "BD", flag: "BD" },
  { code: "+7", name: "RU", flag: "RU" },
  { code: "+52", name: "MX", flag: "MX" },
  { code: "+81", name: "JP", flag: "JP" },
  { code: "+251", name: "ET", flag: "ET" },
  { code: "+63", name: "PH", flag: "PH" },
  { code: "+20", name: "EG", flag: "EG" },
  { code: "+84", name: "VN", flag: "VN" },
  { code: "+243", name: "CD", flag: "CD" },
  { code: "+90", name: "TR", flag: "TR" },
  { code: "+98", name: "IR", flag: "IR" },
  { code: "+49", name: "DE", flag: "DE" },
  { code: "+66", name: "TH", flag: "TH" },
  { code: "+44", name: "GB", flag: "GB" },
  { code: "+255", name: "TZ", flag: "TZ" },
  { code: "+33", name: "FR", flag: "FR" },
  { code: "+39", name: "IT", flag: "IT" },
  { code: "+27", name: "ZA", flag: "ZA" },
  { code: "+95", name: "MM", flag: "MM" },
  { code: "+254", name: "KE", flag: "KE" },
  { code: "+82", name: "KR", flag: "KR" },
  { code: "+57", name: "CO", flag: "CO" },
  { code: "+34", name: "ES", flag: "ES" },
  { code: "+256", name: "UG", flag: "UG" },
  { code: "+54", name: "AR", flag: "AR" },
  { code: "+213", name: "DZ", flag: "DZ" },
  { code: "+249", name: "SD", flag: "SD" },
  { code: "+380", name: "UA", flag: "UA" },
  { code: "+964", name: "IQ", flag: "IQ" },
  { code: "+48", name: "PL", flag: "PL" },
  { code: "+1", name: "CA", flag: "CA" },
  { code: "+212", name: "MA", flag: "MA" },
  { code: "+966", name: "SA", flag: "SA" },
  { code: "+998", name: "UZ", flag: "UZ" },
  { code: "+51", name: "PE", flag: "PE" },
  { code: "+60", name: "MY", flag: "MY" },
  { code: "+93", name: "AF", flag: "AF" },
  { code: "+967", name: "YE", flag: "YE" },
  { code: "+233", name: "GH", flag: "GH" },
  { code: "+258", name: "MZ", flag: "MZ" },
  { code: "+977", name: "NP", flag: "NP" },
  { code: "+261", name: "MG", flag: "MG" },
  { code: "+61", name: "AU", flag: "AU" },
];

const WebForm: React.FC<WebFormProps> = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const handleChange = (fieldId: number, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => ({ ...prev, [fieldId]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    data.form.fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submission_data = data.form.fields.map((field) => ({
        field_id: field.id,
        label: field.label,
        value: formData[field.id] ?? "",
      }));

      const response = await fetch(
        "https://esign-admin.signmary.com/blogs/api/v2/submit-form/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Frontend-Url": "https://1099-partner.com",
          },
          body: JSON.stringify({ form_id: data.form.id, submission_data }),
        }
      );

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
          setFormData({});
        }, 3000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const cleanChoices = field.choices.map((c) => c.trim()).filter((c) => c);

    switch (field.field_type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={field.placeholder || "Your answer"}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-purple-600 outline-none transition-colors text-sm bg-transparent"
          />
        );

      case "email":
        return (
          <input
            type="email"
            placeholder={field.placeholder || "Your email"}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-purple-600 outline-none transition-colors text-sm bg-transparent"
          />
        );

      case "number":
        return (
          <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-purple-600 transition-colors">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-1 px-2 py-2 hover:bg-gray-50 rounded"
              >
                <img
                  src={`https://flagcdn.com/16x12/${countries
                    .find((c) => c.code === countryCode)
                    ?.flag.toLowerCase()}.png`}
                  alt=""
                  className="w-4 h-3"
                />
                <span className="text-sm">{countryCode}</span>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showCountryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {countries.map((c, idx) => (
                    <button
                      key={`${c.code}-${c.name}-${idx}`}
                      type="button"
                      onClick={() => {
                        setCountryCode(c.code);
                        setShowCountryDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-left"
                    >
                      <img
                        src={`https://flagcdn.com/16x12/${c.flag.toLowerCase()}.png`}
                        alt=""
                        className="w-4 h-3"
                      />
                      <span className="text-sm">
                        {c.name} {c.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              type="tel"
              placeholder={field.placeholder || "Your answer"}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="flex-1 px-0 py-2 border-0 outline-none text-sm bg-transparent"
            />
          </div>
        );

      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder || "Your answer"}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            rows={3}
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-purple-600 outline-none transition-colors text-sm bg-transparent resize-none"
          />
        );

      case "radio":
        return (
          <div className="space-y-2">
            {cleanChoices.map((choice, idx) => (
              <label
                key={idx}
                className="flex items-center gap-3 cursor-pointer group py-1"
              >
                <div className="relative">
                  <input
                    type="radio"
                    name={`field-${field.id}`}
                    value={choice}
                    checked={formData[field.id] === choice}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-5 h-5 text-purple-600 border-gray-400 focus:ring-purple-600 cursor-pointer"
                  />
                </div>
                <span className="text-sm text-gray-700">{choice}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {cleanChoices.length > 0 ? (
              cleanChoices.map((choice, idx) => (
                <label
                  key={idx}
                  className="flex items-start gap-3 cursor-pointer py-1"
                >
                  <input
                    type="checkbox"
                    checked={(formData[field.id] || []).includes(choice)}
                    onChange={(e) => {
                      const current = formData[field.id] || [];
                      const updated = e.target.checked
                        ? [...current, choice]
                        : current.filter((c: string) => c !== choice);
                      handleChange(field.id, updated);
                    }}
                    className="w-5 h-5 text-purple-600 border-gray-400 rounded focus:ring-purple-600 cursor-pointer mt-0.5"
                  />
                  <span className="text-sm text-gray-700">{choice}</span>
                </label>
              ))
            ) : (
              <label className="flex items-center gap-3 cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={formData[field.id] || false}
                  onChange={(e) => handleChange(field.id, e.target.checked)}
                  className="w-5 h-5 text-purple-600 border-gray-400 rounded focus:ring-purple-600 cursor-pointer"
                />
                <span className="text-sm text-gray-700">I agree</span>
              </label>
            )}
          </div>
        );

      case "select":
        return (
          <select
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-purple-600 outline-none transition-colors text-sm bg-transparent cursor-pointer"
          >
            <option value="">Choose</option>
            {cleanChoices.map((choice, idx) => (
              <option key={idx} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-gray-100 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl my-8 bg-white rounded-lg shadow-sm"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <EasyIcon
                iconPath="feather/FiX"
                className="w-5 h-5 text-gray-600"
              />
            </button>

            {showSuccess ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <EasyIcon
                    iconPath="feather/FiCheckCircle"
                    className="w-8 h-8 text-green-600"
                  />
                </div>
                <h3 className="text-xl font-normal text-gray-800">
                  {data.form.success_message}
                </h3>
              </div>
            ) : (
              <div className="p-6">
                <div className="bg-purple-600 rounded-t-lg p-6 -m-6 mb-6">
                  <h2 className="text-3xl font-normal text-white mb-2">
                    {data.form.form_title}
                  </h2>
                  {data.form.form_description && (
                    <p className="text-purple-100 text-sm">
                      {data.form.form_description}
                    </p>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {data.form.fields
                    .sort((a, b) => a.order - b.order)
                    .map((field) => (
                      <div
                        key={field.id}
                        className="bg-white border border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors"
                      >
                        <label className="block text-sm font-normal text-gray-700 mb-4">
                          {field.label}
                        </label>
                        {renderField(field)}
                        {errors[field.id] && (
                          <p className="text-xs text-red-600 mt-2">
                            {errors[field.id]}
                          </p>
                        )}
                      </div>
                    ))}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting ? "Submitting..." : data.form.button_text}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({})}
                      className="px-6 py-2.5 text-purple-600 text-sm font-medium hover:bg-purple-50 rounded transition-colors"
                    >
                      Clear form
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebForm;
