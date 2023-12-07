import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appErrorHandling]'
})
export class ErrorHandlingDirective {
  @Input() set appErrorHandling(errorData: any) {
    if (errorData) {
      this.viewContainer.clear(); // Clear any existing content
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: errorData,
        reloadHandler: () => this.retry()
      });
    } else {
      this.viewContainer.clear(); // Clear the content if there's no error
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  private retry() {
    // Implement your retry logic here, e.g., refetch data from the server
    console.log('Retry button clicked');
  }
}
