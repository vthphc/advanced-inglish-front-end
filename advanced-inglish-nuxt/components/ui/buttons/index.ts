import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-white hover:bg-white hover:text-primary border-2 hover:border-primary rounded-2xl cursor-pointer",
				destructive:
					"bg-destructive text-destructive-foreground border-2 duration-200 border-white hover:border-destructive hover:text-destructive transition-colors hover:bg-white",
				outline: "bg-white text-primary hover:bg-primary hover:text-white border-2 border-primary hover:border-white rounded-2xl cursor-pointer",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "cursor-pointer hover:bg-background hover:text-primary",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				xl: "h-13 px-10 text-xl",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
