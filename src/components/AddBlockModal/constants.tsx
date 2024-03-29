import { Conditions, Functions } from "../../shared/functions";
import { RateLimit } from "../FormModal/subComponents/RateLimit";
import { RateTreshold } from "../FormModal/subComponents/RateTreshold";
import { TimeInterval } from "../FormModal/subComponents/TimeInterval";
import { Tokens } from "../FormModal/subComponents/Tokens";
import { WhitelistedAddresses } from "../FormModal/subComponents/WhitelistedAddresses";

export const blocksByMode: Record<Conditions | Functions, JSX.Element | null> =
  {
    // Should stay null as it doesn't have any parameters
    [Conditions.IDENTITY]: null,
    [Conditions.RATE_LIMIT]: <RateLimit />,
    [Conditions.RATE_TRESHOLD]: <RateTreshold />,
    // Should stay null as it doesn't have any parameters
    [Conditions.REFERRALS]: null,
    [Conditions.TIME]: <TimeInterval />,
    [Conditions.TOKEN_HOLDING]: <Tokens />,
    [Conditions.WHITELIST]: <WhitelistedAddresses />,
    [Functions.ADD]: null,
    [Functions.DIVIDE]: null,
    [Functions.MULTIPLY]: null,
    [Functions.PAYMENT]: null,
    [Functions.SUBTRACT]: null,
  };
