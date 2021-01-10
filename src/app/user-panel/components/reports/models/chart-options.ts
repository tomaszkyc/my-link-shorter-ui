import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart, ApexNoData,
  ApexDataLabels, ApexPlotOptions,
  ApexXAxis, ApexLegend, ApexFill,
  ApexGrid, ApexStroke, ApexTitleSubtitle,
  ApexAxisChartSeries, ApexLocale
} from "ng-apexcharts";

export class ChartOptions {

  constructor() {
  }

  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  noData: ApexNoData;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  dataFetched: boolean;
  locale: ApexLocale[];


  public static getLocale() {
    return [{
      "name": "pl",
      "options": {
        "months": [
          "Styczeń",
          "Luty",
          "Marzec",
          "Kwiecień",
          "Maj",
          "Czerwiec",
          "Lipiec",
          "Sierpień",
          "Wrzesień",
          "Październik",
          "Listopad",
          "Grudzień"
        ],
        "shortMonths": [
          "Sty",
          "Lut",
          "Mar",
          "Kwi",
          "Maj",
          "Cze",
          "Lip",
          "Sie",
          "Wrz",
          "Paź",
          "Lis",
          "Gru"
        ],
        "days": [
          "Niedziela",
          "Poniedziałek",
          "Wtorek",
          "Środa",
          "Czwartek",
          "Piątek",
          "Sobota"
        ],
        "shortDays": ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"],
        "toolbar": {
          "exportToSVG": "Pobierz SVG",
          "exportToPNG": "Pobierz PNG",
          "exportToCSV": "Pobierz CSV",
          "menu": "Menu",
          "selection": "Wybieranie",
          "selectionZoom": "Zoom: Wybieranie",
          "zoomIn": "Zoom: Przybliż",
          "zoomOut": "Zoom: Oddal",
          "pan": "Przesuwanie",
          "reset": "Resetuj"
        }
      }
    }
    ];
  }
};
