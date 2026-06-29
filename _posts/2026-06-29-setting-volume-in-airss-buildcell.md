---
layout: post
title: "Setting Volume in AIRSS Buildcell"
author: "Bonan Zhu"
categories: posts
tags: [posts, airss, dft, structure-prediction]
katex: true
---

# Setting Volume in AIRSS Buildcell

One of the most common questions from AIRSS beginners is: **how do I set `#VARVOL`?** This post explains the concept and provides practical guidelines.

## What is `#VARVOL`?

`#VARVOL` specifies the target volume in Å³ based on the **number of rows** in the `POSITIONS` block, before any expansion via `%NUM`, `#NFORM`, or `#SUPERCELL`. Once set, **changing NUM, NFORM, or SUPERCELL will not change the per-atom volume of the generated structures** — this is the key design principle of `buildcell`.

Consider two equivalent seed files for CaTiO₃:

**With `%NUM` expansion (3 rows):**
```
%BLOCK POSITIONS_FRAC
Ca 0.0 0.0 0.0 # Ca % NUM=1
Ti 0.0 0.0 0.0 # Ti % NUM=1
O  0.0 0.0 0.0 # O  % NUM=3
%ENDBLOCK POSITIONS_FRAC

#VARVOL=36
```

**Without `%NUM` (5 rows, explicit atoms):**
```
%BLOCK POSITIONS_FRAC
Ca 0.0 0.0 0.0
Ti 0.0 0.0 0.0
O  0.0 0.0 0.0
O  0.0 0.0 0.0
O  0.0 0.0 0.0
%ENDBLOCK POSITIONS_FRAC

#VARVOL=60
```

In both cases, each row corresponds to 12 Å³, so the per-atom volume is always 12 Å³. In the first case, 3 rows × 12 Å³ = 36 Å³, and `buildcell` scales by the NUM factor (5/3) to produce a structure of 60 Å³ for 5 atoms. In the second case, 5 rows × 12 Å³ = 60 Å³ directly.

Now consider adding `#NFORM=2` to the first seed:

```
#VARVOL=36
#NFORM=2
```

This generates a structure of **120 Å³ for 10 atoms** — still 12 Å³ per atom. The volume scales proportionally with the total atom count.

The rule: **`#VARVOL` = per-atom volume × number of rows in POSITIONS**. All expansion mechanisms (NUM, NFORM, SUPERCELL) preserve the per-atom volume.

## How to estimate VARVOL

### Step 1: Get per-atom volume from a known structure

Take a known structure (experimental, DFT-optimized, or from Materials Project) and compute:

$$V_{\text{per atom}} = \frac{V_{\text{cell}}}{N_{\text{atoms}}}$$

**Example (CaTiO₃):** The experimental orthorhombic perovskite has ~224 Å³ for 20 atoms (4 formula units), giving ~11.2 Å³/atom. Round up to **12 Å³/atom**.

### Step 2: Multiply by the number of rows

- 3-row POSITIONS with `%NUM`: `VARVOL = 12 × 3 = 36`
- 5-row POSITIONS without `%NUM`: `VARVOL = 12 × 5 = 60`

### Step 3: Check the actual generated structures

This is critical. After generating test structures, **always verify that the average per-atom volume is physically reasonable**:

```bash
# Generate a few test structures
for i in $(seq 1 10); do
  buildcell < CaTiO3.cell > CaTiO3-$i.cell
done

# Check per-atom volume using AIRSS utilities
ca -v CaTiO3-*.cell
```

The output should give ~12 Å³/atom. If far off, adjust `#VARVOL`.

This check catches common mistakes, such as setting `#VARVOL` based on total atom count while using `%NUM` expansion. By verifying the actual generated structures, you can confirm that the per-atom volume is correct regardless of how you wrote the seed file.

## Empirical per-atom volumes

When no reference structure is available for the exact composition, you can estimate the per-atom volume from experimental or theoretically relaxed structures with similar stoichiometry. For example, if searching for a new perovskite ABX₃, use the per-atom volume of a known perovskite as a starting point.

## Common pitfalls

### VARVOL too small

If `#VARVOL` is too small for the `#MINSEP` constraints, `buildcell` will fail to place all atoms — it may hang silently. **Either increase `#VARVOL` or reduce `#MINSEP` values** until structures are generated successfully.

### Mixing NUM and VARVOL

The most common mistake is setting `#VARVOL` based on the total atom count while using `%NUM` expansion. Remember: **count the rows, not the atoms**.

### Using `gencell`

The `gencell` utility generates seed files by expanding species and formula units into explicit position lines:

```bash
gencell <total_volume> <n_formula_units> <species1> <count1> ...
```

For CaTiO₃:
```bash
gencell 60 1 Ca 1 Ti 1 O 3
```

This creates a `.cell` file with 5 explicit position lines and `#VARVOL=60`, equivalent to the no-`%NUM` example above. The internal `#NFORM` is always 1 — all expansion is done upfront by writing explicit lines. This means `gencell` output does not use `%NUM` or `#NFORM`, and `#VARVOL` directly corresponds to the total volume of the cell.

## Summary

1. `#VARVOL` = per-atom volume × **number of rows** in POSITIONS (before NUM/NFORM/SUPERCELL expansion)
2. The per-atom volume is preserved through all expansion mechanisms — change NUM, NFORM, or SUPERCELL freely
3. Estimate per-atom volume from a known structure or from structures with similar stoichiometry
4. **Always check the actual generated structures** to verify the per-atom volume
5. If `buildcell` fails → increase `#VARVOL` or reduce `#MINSEP` values
