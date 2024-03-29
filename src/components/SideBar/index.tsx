import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { TooltipWrapper } from "../TooltipWrapper";
import { useMetadata } from "../../zustand/metadata";
import {
  PaymasterContractType,
  useCompileContract,
  useContract,
} from "../../hooks/useContract";
import { useEffect, useState } from "react";
import { deployContract } from "../../utils/wallet/connectToWallet";
import { FormModal } from "../FormModal";

const myLittlePony = "0x2E67B4175251e3a2cd712367d3d9A10698ca3527";

export function SideBar() {
  const theme = useTheme();
  const { downloadSource, contractName } = useMetadata((state) => ({
    downloadSource: state.downloadSource,
    contractName: state.contractName,
  }));
  const contract = useContract(PaymasterContractType.DepositPaymaster);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { compiledContract, compile, compiling } = useCompileContract(contract);

  useEffect(() => {
    if (!compiling && compiledContract) {
      console.log(compiledContract);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bytecode = (compiledContract as any).contracts["contract"][
        "BasePaymaster"
      ].evm.bytecode.object;
      (async () => {
        setIsLoading(true);
        try {
          await deployContract(bytecode);
        } catch {
          console.log("nice");
        }
        setIsLoading(false);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 10000);
      })();
    }
  }, [compiling, compiledContract]);

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([downloadSource], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${contractName}.sol`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      {isLoading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bgcolor="rgba(0,0,0, 0.6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1070"
        >
          {isLoading && <CircularProgress />}
          {showSuccess && <>Success</>}
        </Box>
      )}
      {showSuccess && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bgcolor="rgba(0,0,0, 0.6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1070"
        >
          {isLoading && <CircularProgress />}
          <FormModal onClose={() => setShowSuccess(false)} open={showSuccess}>
            <Typography variant="h5">
              The contract {contractName} <strong>({myLittlePony})</strong> has
              been deployed.
            </Typography>
          </FormModal>
        </Box>
      )}
      <Box
        display={"inline-flex"}
        flexDirection={"column"}
        bgcolor={theme.palette.background.sidebar}
        padding={"20px"}
        height={"95vh"}
        borderRadius={`0 ${theme.custom.borderRadius.default} ${theme.custom.borderRadius.default} 0`}
        border={`2px solid #474747`}
        borderLeft={"none"}
      >
        {/* ICON */}
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <svg
            width="27"
            height="27"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.0087 29.3077H5.99133C2.68774 29.3077 0 26.9076 0 23.9575V5.81163C0 2.86155 2.68774 0.461517 5.99133 0.461517H24.0087C27.3123 0.461517 30 2.86155 30 5.81158V23.9575C30 26.9076 27.3123 29.3077 24.0087 29.3077ZM5.99133 2.9664C4.23446 2.9664 2.80509 4.24273 2.80509 5.81158V23.9575C2.80509 25.5264 4.23446 26.8028 5.99133 26.8028H24.0087C25.7655 26.8028 27.1949 25.5264 27.1949 23.9575V5.81163C27.1949 4.24273 25.7655 2.9664 24.0087 2.9664H5.99133ZM22.0834 4.29304C20.0695 4.29304 18.4368 5.75096 18.4368 7.54939V7.54939C18.4357 8.42707 18.3463 9.40022 17.6916 9.98482L17.0113 10.5923C16.5149 11.0356 15.8132 11.1306 15.1477 11.1309V11.1309V11.1309C14.4331 11.1303 13.6743 11.0408 13.1412 10.5648L12.4428 9.94117C11.7992 9.36643 11.7046 8.41227 11.7046 7.54939V7.54939C11.7046 5.75101 10.072 4.29304 8.05799 4.29304C6.04408 4.29304 4.41137 5.75096 4.41137 7.54939C4.41137 9.34777 6.04401 10.8057 8.05799 10.8057C8.13785 10.8058 8.21753 10.8036 8.29691 10.799C9.30117 10.7408 10.3946 10.8044 11.1449 11.4744L11.7172 11.9854C12.1818 12.4003 12.267 13.0798 12.2678 13.7027V13.7027C12.2678 14.3326 12.5214 14.9094 12.9424 15.3564C13.5272 15.9775 14.1379 16.6867 14.1379 17.5398V17.5398C14.1379 18.456 13.4645 19.2079 12.734 19.761C11.9456 20.3581 11.4451 21.249 11.4451 22.2446C11.4451 24.043 13.0777 25.501 15.0917 25.501C17.1057 25.501 18.7383 24.0431 18.7383 22.2446C18.7383 21.3401 18.3251 20.522 17.6581 19.9322C16.9464 19.3028 16.2698 18.5139 16.2698 17.5639V17.5639C16.2698 16.666 16.9047 15.9141 17.4737 15.2195C17.8221 14.7943 18.0278 14.27 18.0278 13.7027V13.7027C18.0285 13.0386 18.1057 12.3073 18.601 11.865L19.0936 11.4252C19.8026 10.792 20.8322 10.7246 21.7802 10.7947C21.8808 10.8021 21.982 10.8058 22.0834 10.8057C24.0974 10.8057 25.73 9.34782 25.73 7.54939C25.73 5.75101 24.0974 4.29304 22.0834 4.29304ZM8.05266 8.75172C8.05264 8.75173 8.05261 8.75174 8.05259 8.75174C7.309 8.75172 6.70623 8.2134 6.70623 7.54945C6.70623 6.88536 7.30902 6.34703 8.05263 6.34703C8.79624 6.34703 9.39909 6.88536 9.39909 7.54939C9.39909 8.2134 8.79626 8.75167 8.05273 8.75169C8.05271 8.75169 8.05268 8.7517 8.05266 8.75172V8.75172ZM16.4171 22.311C16.4171 22.975 15.8143 23.5133 15.0707 23.5133C14.3271 23.5133 13.7242 22.975 13.7242 22.311C13.7242 21.6469 14.327 21.1086 15.0706 21.1086C15.8142 21.1086 16.4171 21.6469 16.4171 22.311ZM22.078 8.75172C22.078 8.75173 22.078 8.75174 22.0779 8.75174C21.3343 8.75172 20.7316 8.2134 20.7316 7.54945C20.7316 6.88536 21.3344 6.34703 22.078 6.34703C22.8216 6.34703 23.4244 6.88536 23.4244 7.54939C23.4244 8.2134 22.8216 8.75167 22.0781 8.75169C22.0781 8.75169 22.078 8.7517 22.078 8.75172V8.75172Z"
              fill="url(#paint0_linear_10_9)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_10_9"
                x1="19.5"
                y1="0.461518"
                x2="6.82795"
                y2="27.4992"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F20486" />
                <stop offset="1" stopColor="#FF6068" />
              </linearGradient>
            </defs>
          </svg>
          <Typography
            fontSize={"14px"}
            variant="h6"
            color={theme.palette.text.primary}
          >
            PayFlux
          </Typography>
        </Box>

        <Box
          height={"1px"}
          width={"100%"}
          display={"block"}
          bgcolor={"#514E4E"}
          marginBottom={"12px"}
          marginTop={"12px"}
        />
        {/* MENU */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"12px"}
          alignItems={"center"}
        >
          <TooltipWrapper label="Save the code">
            <IconButton onClick={handleDownload}>
              <svg
                width="23"
                height="20"
                viewBox="0 0 23 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.9898 10.4102C7.86065 10.2765 7.70617 10.1698 7.53537 10.0965C7.36456 10.0231 7.18085 9.98446 6.99496 9.98285C6.80907 9.98123 6.62472 10.0167 6.45266 10.087C6.28061 10.1574 6.1243 10.2614 5.99285 10.3928C5.8614 10.5243 5.75744 10.6806 5.68705 10.8527C5.61666 11.0247 5.58123 11.2091 5.58285 11.395C5.58446 11.5808 5.62309 11.7646 5.69646 11.9354C5.76983 12.1062 5.87649 12.2607 6.0102 12.3898L10.2102 16.5898C10.4727 16.8523 10.8288 16.9997 11.2 16.9997C11.5712 16.9997 11.9273 16.8523 12.1898 16.5898L16.3898 12.3898C16.6448 12.1258 16.7859 11.7721 16.7827 11.405C16.7796 11.038 16.6323 10.6868 16.3727 10.4273C16.1132 10.1677 15.762 10.0204 15.395 10.0173C15.0279 10.0141 14.6742 10.1552 14.4102 10.4102L12.6 12.2204V4.4H19.6C20.3426 4.4 21.0548 4.695 21.5799 5.2201C22.105 5.7452 22.4 6.45739 22.4 7.2V17C22.4 17.7426 22.105 18.4548 21.5799 18.9799C21.0548 19.505 20.3426 19.8 19.6 19.8H2.8C2.05739 19.8 1.3452 19.505 0.820101 18.9799C0.294999 18.4548 0 17.7426 0 17V7.2C0 6.45739 0.294999 5.7452 0.820101 5.2201C1.3452 4.695 2.05739 4.4 2.8 4.4H9.8V12.2204L7.9898 10.4102ZM9.8 1.6C9.8 1.22869 9.9475 0.872598 10.2101 0.610047C10.4726 0.347496 10.8287 0.199997 11.2 0.199997C11.5713 0.199997 11.9274 0.347496 12.1899 0.610047C12.4525 0.872598 12.6 1.22869 12.6 1.6V4.4H9.8V1.6Z"
                  fill="url(#paint0_linear_20_11)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_20_11"
                    x1="11.2"
                    y1="0.199997"
                    x2="11.2"
                    y2="19.8"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#AB6FFF" />
                    <stop offset="0.5625" stopColor="#68DBFD" />
                  </linearGradient>
                </defs>
              </svg>
            </IconButton>
          </TooltipWrapper>
          <TooltipWrapper label="Deploy the contract">
            <IconButton onClick={() => compile()}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.9279 19.7069L19.9778 2.07877C20.051 1.89688 20.0691 1.69748 20.0299 1.50536C19.9907 1.31325 19.8958 1.1369 19.7572 0.998255C19.6186 0.859609 19.4422 0.76478 19.2501 0.725565C19.058 0.68635 18.8586 0.704479 18.6767 0.777695L1.04851 7.82755C0.895062 7.88779 0.759028 7.98529 0.652677 8.11124C0.546327 8.23719 0.473005 8.38764 0.439328 8.54901C0.405651 8.71038 0.412677 8.87759 0.459774 9.03557C0.50687 9.19354 0.592554 9.33731 0.709096 9.4539L3.96179 12.7207C4.31534 13.0743 4.88103 13.1167 5.27701 12.8056L16.6049 4.1506L7.9428 15.4714C7.63874 15.8744 7.68117 16.4401 8.03472 16.7937L11.3016 20.0464C11.8036 20.5484 12.6663 20.3787 12.9279 19.7069Z"
                  fill="url(#paint0_linear_24_14)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_24_14"
                    x1="6.87947"
                    y1="1.87947"
                    x2="18.8774"
                    y2="13.8774"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#AB6FFF" />
                    <stop offset="0.5625" stopColor="#68DBFD" />
                  </linearGradient>
                </defs>
              </svg>
            </IconButton>
          </TooltipWrapper>
        </Box>
      </Box>
    </>
  );
}
