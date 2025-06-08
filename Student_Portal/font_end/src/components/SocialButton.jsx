import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const providers = {
  google: {
    icon: <FcGoogle className="text-xl" />,
    text: "Continue with Google",
  },
  github: {
    icon: <FaGithub className="text-xl" />,
    text: "Continue with GitHub",
  },
  linkedin: {
    icon: <FaLinkedin className="text-xl text-blue-700" />,
    text: "Continue with LinkedIn",
  },
};

const SocialButton = ({ provider = "google", onClick }) => {
  const { icon, text } = providers[provider] || providers.google;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-4 py-2 border rounded-md shadow-sm hover:bg-gray-100 transition"
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
};

export default SocialButton;
