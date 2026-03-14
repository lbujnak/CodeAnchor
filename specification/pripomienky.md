*Property - nema mat referenciu na majitela?*
```
Doplnené do špecifikácie.
```

*Property - PropertyVariant - nema mat Property aspon jeden PropertyVariant? (1..*)*
```
Nie nutne, ale ak nemá žiaden variant, nebude ho možné nastaviť ako viditeľným (active).
```

*PropertyVariant.priceRanges, PropertyBooking - nie je celkom jasne, ako
sa pocita koncova cena rezervacie, nakolko tu sa uvadza range a na
PropertyBooking cenu nemate. Nezavisi napr. aj od poctu ubytovanych osob?*
```
Doplnené do špecifikácie.
```

*PropertyImage - nemozu rozne PropertyVariant-y zdielat rovnaku fotku?
Napr. fotky exterieru, spolocnych priestorov, .. (z pohladu produkcnej
aplikacie, pre TIA to nutne nie je)*
```
Pôvodne to špecifikácia umožnovala, kedže PK bol (variantId, fileId), ale to by vytváralo redundancie a tak som návrh upravil.
```

*PropertyBooking - nakolko tu mate atribut createdAt, dava mi zmysel mat
aj modifiedAt (opat z pohladu produkcnej aplikacie, pre TIA netreba)*
```
Dá sa to využiť na identifikáciu času zmeny, tak som sa rozhodol, že to pridám.
```

*PropertyBooking - PropertyReview - review zrejme moze, ale nemusi byt
zadane, takze skor by malo byt 0..1 pri PropertyReview*
```
Áno, opravené.
```

*Token - nema by byt samotny token unique? Asi nechceme mat rovnaky token
pre roznych userov... Token by sa mal ukladat hashovany.*
```
Áno, to som neštastne zapísal, kombinácia (tokenTypeId, userId) mala byť unique a samostatne aj token String.
```

*User - nema byt email unikatny?*
```
Áno, opravené.
```

Nemate uvedenu explicitne architekturu, ale teda predpokladam SPA.
```
Doplnené do špecifikácie.
```