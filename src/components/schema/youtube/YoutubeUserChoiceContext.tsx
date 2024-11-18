import { useStateLs } from "@_hooks/useStateLs";
import {
  type UserChoice,
  defaultChoice,
  UserChoiceContext,
} from "@_routes/youtube/utils/contexts";

interface YoutubeUserChoiceContextProps {
  children: React.ReactNode | React.ReactNode[];
}

const YoutubeUserChoiceContext = ({
  children,
}: YoutubeUserChoiceContextProps) => {
  const [userChoice, setUserChoice] = useStateLs<UserChoice>(
    "_vidl_user_choice_",
    defaultChoice
  );

  return (
    <UserChoiceContext.Provider value={{ userChoice, setUserChoice }}>
      {children}
    </UserChoiceContext.Provider>
  );
};

export default YoutubeUserChoiceContext;
