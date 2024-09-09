interface Window {
	ProjectApp: ProjectApp;
	environmentObject: {
		platform: string;
		os: string;
		browser: string;
		isLocal: boolean;
	} | null;
}
