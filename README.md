# Indeks Jakości Powietrza w Opolu
### UWAGA
Aplikacja jest jeszcze w fazie rozwojowej i nie wszystkie funkcjonalności mogą działąć poprawnie. Również niektóre elementy na stronie mogą (i zapewne zmienią) zmienić swoje położenie. 

Aplikacja zbiera dane za pomocą API udostępnionego przez LOOKO2 z 7 stacji pomiarowych znajdujących się na terenie Opola i przedstawia je w prostej formie graficznej. Zarówno **Indeks Jakości Powietrza** jak i stężenie pyłów **PM 2.5** i **PM 10** jest porównywane z normą - kolor tła dla odpowiednich pól zależy od tego jak bieżąca wartość pomiaru mieści się w określnej normie. 

Na mapie zaznaczone jest położenie stacji pomiarowej w mieście. 

Poniewaz jakość powietrza zeleży bardzo od pogody jaka panuje w danym momencie, na stornie znajdują się też inormacjie udostępnione za pomocą API od APIXU odnosnie aktualnej pogody w Opolu.


### Do stworzenia aplikacji użyto:
* HTML
* CSS - SASS
* JavaScript - ES6
* Gulp

### Wersja 0.8
* 1 - pobieranie danych z API LOOKO2
* 2 - pobieranie danych z API APIXU
* 3 - wyświetlanie mapy Google wraz z lokalizacją stacji pomiarowych
