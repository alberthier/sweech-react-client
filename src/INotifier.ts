export interface INotifier {
    showLoadingIndicator(): void
    hideLoadingIndicator(): void
    snack(message: string): void
}