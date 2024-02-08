Examples obsahuje některé ukázky mé práce:
Sliders je kolekce sliderů do Storybooku. Důležitý je DateSlider, zadáním bylo utvořit horizontální posuvník, na kterém můžu vybrat časovou osu 1 bod nebo rozpětí - vždy převádí datum do formátu měsíc/rok.
Main slider je prototyp všeobecného posuvníku s jedním bodem nebo škálou, můžou být až tři nad sebou, hodnoty je možno zobrazit jako datum, možnost nastavení sx.
Input DatePicker - pro jiný projekt, výběr data s použitím nové verze date pickeru z knihovny MUI. Je zde dán maximální a minimální časový rozsah, ošetření formátu data pomocí moment.js,
nastavena validace. Dále jsem dělala např. funkce pro různé inputy, tlačítka apod. Ve Storybooku i v projektu. Stories i pro složité komponenty, např. naplnění tabulky daty, nastavení filtrování. 

Pieces obsahuje soubory z projektů, jde o spolupráci, např. custom hook useValidator navrhnul seniorní kolega, já jsem potom psala jednotlivá pravidla (kromě toho prvního) a použila je ve formulářích a filtrech.
Filtrovací pole jsem např. přidávala k už existujícím, takže existovala předloha, z níž jsem mohla převzít společné prvky.
SortingBy je jedno z filtrovacích polí, je volitelně aktivní nebo ne, uživatel si vybere z nabídky, podle čeho má filtrovat, jsou zde 2 validační podmínky. Texty jsou extrahovány do samostatného souboru .json
Příklad errors je část z globálního zachytávání errorů, řadí error zprávy podle druhu, na jejichž základě vypisuje do toastu zprávu pro uživatele.
Zabývala jsem se také voláním dat z BE, zde je soubor Document Queries, přidávala jsem nové GQL dotazy k již existujícímu projektu a zvlášť nastavovala filtry. Zde byly všechny queries volány custom hookem.
V předchozím projektu jsme volali data přes Axios, tam jsem např. nastavovala podmínky pro skládání GQL dotazů.

Jinak mým posledním úkolem před odchodem z práce bylo globální zachytávání chyb. Přiznám se, že jsem úkol nedokončila. Věděla jsem, že je potřeba použít Context provider a Error boundary (výjimečně jde v Reactu o class), implementace se mi však nezdařila.

