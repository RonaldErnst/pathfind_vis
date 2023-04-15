import { GridTileColor } from "@/contexts/AlgorithmContext";

export default function getAlgStepColor(color: GridTileColor) {
    let gridColor;

    switch(color) {
        case "path":
            gridColor = "bg-amber-400";
            break;
        case "queued":
            gridColor = "bg-slate-400";
            break;
        case "unvisited":
            gridColor = "bg-slate-200";
            break;
        case "visited":
            gridColor = "bg-cyan-400";
            break;
        case "visiting":
            gridColor = "bg-emerald-400";
            break;
        case "wall":
            gridColor = "bg-slate-800";
            break;
    }

    return gridColor;
}