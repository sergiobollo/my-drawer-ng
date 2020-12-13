import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "SearchForm",
    moduleId: module.id,
    template: `
    <FlexboxLayout flexDirection="row">
        <TextField #texto="ngModel" [(ngModel)]="textFieldValue" hint="Ingresar texto..."
            required minlen="4"></TextField>
        <Label *ngIf="texto.hasError('required')" text="*"></Label>
        <Label *ngIf="!texto.hasError('required') && texto.hasError('minlen')" text="Debes ingresar al menos 4 caractéres"></Label>
    </FlexboxLayout>
    <Button text="Buscar!" (tap)="onButtonTap()" *ngIf="texto.valid"></Button>
    `
})
export class SearchFormComponent implements OnInit {
    textFieldValue: string = "";
    @Output() search: EventEmitter<string> = new EventEmitter();
    @Input() inicial: string;

    ngOnInit(): void {
        this.textFieldValue = this.inicial;
    }

    onButtonTap(): void {
        console.log(this.textFieldValue);
        if (this.textFieldValue.length > 2) {
            this.search.emit(this.textFieldValue);
        }
    }
}
