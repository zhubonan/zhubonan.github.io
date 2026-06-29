---
layout: post
title: "Setting Volume in AIRSS Buildcell"
author: "Bonan Zhu"
categories: posts
tags: [posts, airss, dft, structure-prediction]
katex: true
---

# Setting Volume in AIRSS Buildcell

One of the most common questions from AIRSS beginners is: **how do I set `#VARVOL`?** This post explains the concept behind the volume parameter in `buildcell`, and provides practical guidelines for estimating it.

## What is `#VARVOL`?

`#VARVOL` specifies the target volume in Å³ for the **unexpanded** cell — that is, the cell *before* applying `#NFORM` or `%NUM` expansion.

Consider this seed file for Ca₆PPbN₂ (10 atoms per formula unit):

```
%BLOCK POSITIONS_FRAC
Ca 0.0 0.0 0.0 # Ca % NUM=6
P  0.0 0.0 0.0 # P  % NUM=1
Pb 0.0 0.0 0.0 # Pb % NUM=3
N  0.0 0.0 0.0 # N  % NUM=2
%ENDBLOCK POSITIONS_FRAC

#VARVOL=209
#NFORM=1
```

Here the cell contains 4 atoms in the POSITIONS block (1 Ca, 1 P, 1 Pb, 1 N), but `%NUM` expands them to 10 atoms. The `#VARVOL=209` is the volume **per formula unit** (10 atoms). When `#NFORM=2` is used, buildcell will automatically scale the target volume to 418 Å³.

The key point: **`#VARVOL` is per-formula-unit volume**. You set it once, and it scales automatically with `#NFORM`.

## How to estimate the per-atom volume

The simplest approach: **use a known structure as reference**.

### Method 1: From an existing structure

If you have a known structure (experimental, DFT-optimized, or from Materials Project), divide its volume by the number of atoms to get the per-atom volume:

$$V_{\text{per atom}} = \frac{V_{\text{cell}}}{N_{\text{atoms}}}$$

Then multiply by the number of atoms in your formula unit:

$$\text{VARVOL} = V_{\text{per atom}} \times N_{\text{formula unit}}$$

**Example**: A 60-atom SQS structure of Ca₃₆N₁₂P₃Pb₉ has a cell volume of 1255.17 Å³. The per-atom volume is:

$$V_{\text{per atom}} = \frac{1255.17}{60} = 20.92 \text{ Å}^3/\text{atom}$$

For the reduced formula Ca₆PPbN₂ (10 atoms), the VARVOL is:

$$\text{VARVOL} = 20.92 \times 10 = 209.2 \text{ Å}^3$$

### Method 2: From empirical estimates

When no reference structure is available, use these rough estimates:

| Material Type | Volume (Å³/atom) | Examples |
|--------------|-----------------|----------|
| Dense metals, high pressure | 5–10 | Fe, Al at high P |
| Typical metals | 10–15 | Cu, Ag at ambient |
| Oxides, semiconductors | 10–15 | SiO₂, TiO₂, perovskites |
| Molecular crystals | 15–25 | Ice, organic crystals |
| Open frameworks | 20–30+ | Zeolites, MOFs |

If unsure, **start with 15 Å³/atom** and adjust based on whether `buildcell` generates structures successfully.

## Common pitfalls

### VARVOL too small

If `VARVOL` is too small for the given `MINSEP` constraints, `buildcell` will struggle or fail to place all atoms. The symptom is usually `buildcell` hanging or taking very long.

**Solution**: Increase VARVOL until structures are generated. A quick test:

```bash
for i in $(seq 1 10); do
  buildcell < seed.cell > test-$i.cell 2> /dev/null && echo "OK" || echo "FAIL"
done
```

### VARVOL and NFORM interaction

A common confusion is whether to adjust VARVOL when changing NFORM. Remember:

- `#VARVOL=209` with `#NFORM=1` → target volume 209 Å³
- `#VARVOL=209` with `#NFORM=2` → target volume 418 Å³
- `#VARVOL=209` with `#NFORM=4` → target volume 836 Å³

You **do not** need to change VARVOL when changing NFORM. The seed file stays the same.

### Using `gencell` for convenience

The `gencell` utility automates seed file generation:

```bash
gencell <volume_per_fu> <n_units> <species1> <count1> [<species2> <count2> ...]
```

For example, generating a Ca₆PPbN₂ seed with ~21 Å³/atom:

```bash
gencell 209 1 Ca 6 P 1 Pb 3 N 2
```

This creates the `.cell`, `.param`, and `.par` files automatically.

## A practical example

Here is a complete seed file for the Ca-P-Pb-N system, demonstrating volume setting along with other common parameters:

```
%BLOCK LATTICE_CART
4.374 0.0  0.0
0.0  4.374 0.0
0.0  0.0  4.374
%ENDBLOCK LATTICE_CART

#VARVOL=209

%BLOCK POSITIONS_FRAC
Ca 0.0 0.0 0.0 # Ca % NUM=6
P  0.0 0.0 0.0 # P  % NUM=1
Pb 0.0 0.0 0.0 # Pb % NUM=3
N  0.0 0.0 0.0 # N  % NUM=2
%ENDBLOCK POSITIONS_FRAC

#NFORM=1
#SYMMOPS=2-4
#SLACK=0.25
#OVERLAP=0.1
#COMPACT
#CELLADAPT
#MINSEP=1.5 Ca-Ca=3.0 Ca-N=2.0 Ca-P=2.5 Ca-Pb=2.8 N-N=2.0 N-P=1.4 N-Pb=1.9 P-P=1.9 P-Pb=2.3 Pb-Pb=2.8
```

## Summary

1. `#VARVOL` = per-formula-unit volume, scales automatically with `#NFORM`
2. Best estimate: use a known structure's volume / number of atoms × atoms per formula unit
3. Fallback: use empirical per-atom volumes (10–15 Å³/atom for most oxides)
4. If buildcell fails, increase VARVOL — it's probably too small for the MINSEP constraints
