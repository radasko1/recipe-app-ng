import { InjectionToken } from "@angular/core";
import { LocaleFileKey } from "../models/locale-file-key.type";

export const GeneralLocale = new InjectionToken<LocaleFileKey>('General Locale Texts');
