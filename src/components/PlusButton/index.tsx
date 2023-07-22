import {
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
	useTheme,
} from "@mui/material";
import FunctionsIcon from "@mui/icons-material/Functions";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { usePayfluxStore } from "../../zustand";
import { PlusButtonProps } from "./types";
import { BlockType } from "../../shared/functions";

export const PlusButton = ({ id }: PlusButtonProps) => {
	const theme = useTheme();
	const { setBlockModal, setBlockIdToProps, blockIdToProps, addChild } =
		usePayfluxStore((state) => ({
			blockIdToProps: state.blockIdToProps,
			addChild: state.addChild,
			setBlockIdToProps: state.setBlockIdToProps,
			setBlockModal: state.setBlockModal,
		}));

	const addBlock = (type: BlockType) => {
		const newId = (Object.keys(blockIdToProps).length + 1).toString();

		setBlockIdToProps(newId, { type });
		addChild(id, newId);
	};

	const actions = [
		{
			icon: <FunctionsIcon />,
			name: "Functions",
			action: () => addBlock(BlockType.FUNCTION),
		},
		{
			icon: <QuestionMarkIcon />,
			name: "Conditions",
			action: () => setBlockModal({ type: BlockType.CONDITION, id }),
		},
	];

	return (
		<SpeedDial
			ariaLabel="Plus"
			FabProps={{
				sx: {
					backgroundImage: theme.palette.gradient.red,
					color: theme.palette.text.primary,
				},
			}}
			direction="down"
			icon={<SpeedDialIcon />}
		>
			{actions.map((action) => (
				<SpeedDialAction
					key={action.name}
					icon={action.icon}
					tooltipTitle={action.name}
					onClick={action.action}
				/>
			))}
		</SpeedDial>
	);
};
