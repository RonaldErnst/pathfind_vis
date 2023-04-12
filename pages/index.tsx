import Grid from "@/components/Grid";
import { GridProvider } from "@/contexts/GridContext";

export default function Home() {
	return (
		<main className="flex w-full h-full flex-col items-center justify-between">
			<GridProvider>
			{/* TODO NavBar with settings for the grid / maze */}
				<div className="w-full h-full bg-slate-500 p-16">
					<Grid />
				</div>
			</GridProvider>

			{/* TODO controls for the algorithm simulation */}
		</main>
	);
}
