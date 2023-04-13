import Grid from "@/components/Grid";
import { GridProvider } from "@/contexts/GridContext";

export default function Home() {
	return (
		<main className="flex w-full h-full flex-col items-center justify-between">
			<GridProvider>
                Algro
			    {/* TODO Grid Controls NavBar with settings for the grid / maze */}
				<div className="w-full h-full bg-slate-500 p-16">
					<Grid />
				</div>
			    {/* TODO algorithm simulation controls */}
			</GridProvider>

		</main>
	);
}
