---
layout: post
title: "A cheeky way to do unit conversion"
author: "Bonan Zhu"
categories: posts
tags: [posts]
katex: true
---

# Unit conversion done right

We often have to convert units, for example from $$\mathrm{eV}$$ to $$\mathrm{Hartree}$$, from $$\mathrm{kJ/mol}$$ to  $$\mathrm{eV/atom}$$ perhaps.
If you google "unit convertion", likely there will be online tools though: 1. they may not be right, and 2. you will have to watch some advertisements.

In this post we show various ways to do common unit conversion in atomistic simulations without going to dodgy website or with good old pen and paper (cos I am a bit lazy).

# Using `ase`

The Atomic Simulation Environment has a `ase.units` module. All variables there are in the **atomic unit** that ASE uses internally.
For example, `units.GPa` is the value of 1 GPa in the internal unit `eV/Å^-3`:

```python
from ase import units
pressure_in_ev_A = pressure_in_GPa * units.GPa
energy_per_particle = energy_in_kj_mol * units.kJ / units.mol
```

It should be kept in mind that the by connecting the value with the unit using `*`  the result is in ase's internal units. More information can be seen on https://ase-lib.org/ase/units.html:

> Electron volts (eV), Ångström (Ang), the atomic mass unit and Kelvin are defined as 1.0.
> Time is given in units of $$\mathrm{\AA \sqrt{u/eV}}$$. Thus, for example, $$1 \mathrm{fs} \approx \mathrm{0.098\AA\sqrt{u / eV}}$$ , where $$\mathrm{u}$$is the atomic mass unit.

# Using `Unitful` and `UnitfulAtomic`

The above approach works well in Python and you *probably* don't need to install another package as chances are `ase` has been installed as needed by your materials science work!

However, what if I want to use other units than `eV` for energy? Of course, I can convert it *to* eV and then to others....
Here we introduce a more advanced package for unit conversion (and more) but it is written in Julia (for good reasons).

First, you will need to install Julia, if not already, the best way is to install `juliaup` which is a julia version manager and installer:

```bash
curl -fsSL https://install.julialang.org | sh
```

On Windows, it can be installed directly from the Windows store [here](https://www.microsoft.com/store/apps/9NJNWW8PVKMN), or use command line.

```
winget install --name Julia --id 9NJNWW8PVKMN -e -s msstore
```

Following the instruction to complete the installation, launch a Julia REPL and type:

```julia
using Unitful
```

should prompt you to install the package if not already.
Once installed and loaded, we can use a special `u""` syntax to mark some number with units:

```julia
julia> 1.0u"eV"
1.0 eV

julia> 1.5u"Å"
1.5 Å

julia> 10u"GPa"
10 GPa
```

PS: In the REPL type `\Angstrom` then press space to get Å.

Math operations will automatically operate on units as well:

```julia
julia> 10.0u"GPa" / 1.0u"Å^3"
10.0 GPa Å^-3
```

To convert units, one can use the `uconvert` function with the first arguments being the *unit to be converted to*:

```julia
julia> uconvert(u"eV/Å^3", 10.0u"GPa")
0.06241509074460763 eV Å^-3
```

A nice thing is that `Unitful` does dimensionality checks so it unlikely to have unnoticed mistakes:

```julia
julia> uconvert(u"eV/Å^2", 10.0u"GPa")
ERROR: DimensionError: eV Å^-2 and GPa are not dimensionally compatible.
```

We can define units ourselves as well. It can be useful to define a `atom` unit in order to convert $$\mathrm{kj/mol}$$ to $$\mathrm{eV/atom}$$.
One `atom` is a 1/$$\mathrm{A_v}$$ of a $$\mathrm{mol}$$ where $$\mathrm{A_v}$$ is the Avogadro's constant (stored as `Unitful.Na`):

```julia
julia> using Unitful

julia> Unitful.register(@__MODULE__);

julia> @unit atom "atom" atom 1/Unitful.Na true;

julia> uconvert(u"eV/atom", 100u"kJ/mol")
1.0364269656262175 eV atom^-1
```

The `UnitfulAtomic` package provides additional atomic units such as `u"bohr"`.
