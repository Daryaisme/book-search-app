import { TuiAlertService } from '@taiga-ui/core';

export const showNotification = (alertService: TuiAlertService, mainText: string, title: string): void => {
	alertService
		.open(mainText, { label: title })
		.subscribe();
}
