import {Component, Input, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements ControlValueAccessor {
    @Input() type: 'text' | 'password' | 'number' = 'text';

    isPasswordVisible = signal(false);

    private _value: string | number = '';
    private onChange: (value: any) => void = () => {};
    protected onTouched: () => void = () => {};

    get value () {
      return this._value;
    }

    set value(value: string | number) {
      this._value = value;
      this.onChange(value);
      this.onTouched();
    }

    writeValue(obj: any): void {
        this._value = obj;
    }
    registerOnChange(fn: any): void {
       this.registerOnChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    togglePasswordVisibility(): void {
      this.isPasswordVisible.update((prev) => !prev);
    }
}
