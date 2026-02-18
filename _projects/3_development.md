---
layout: page
title: Software and methodology development
description: Making tools for computational materials science.
img: assets/img/code.png
importance: 3
category: work
related_publications: true
---

I am interested in developing tools for material simulations and use them to solve real-world problems.

## Band structure unfolding

When a supercell is used for simulation, the band structure becomes folded in the reciprocal space.
We have developed [easyunfold](https://github.com/SMTG-Bham/easyunfold), a Python package aimed at simplifying the process and help data provenance and sharing {% cite zhu_easyunfold_2024 %}.

<div class="row justify-content-md-center">
    <div class="col-4">
        {% include figure.liquid loading="eager" path="assets/img/unfold_project_MgO_v_O_0_tall.png" title="mgo unfolded band structure" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-4">
        {% include figure.liquid loading="eager" path="assets/img/CSTB_easyunfold.gif" title="unfolded band structure of cstisnbr" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## High-throughput workflows

AiiDA is a platform for executing calculations (workflows) and keeping track of data provenance while performing complex automated workflows {% cite bosoni_how_2024 %}.
We have developed plugins to interface it with density functional theory codes:

- [aiida-vasp](https://github.com/aiida-vasp/aiida-vasp): The interface to the VASP code.
- [aiida-castep](https://github.com/aiida-vasp/aiida-vasp): The interface to the CASTEP code.
- [aiida-grouppathx](https://github.com/zhubonan/aiida-grouppathx): A tool to organize provenance data in a file-and-folder style.

Both package also includes workflows to handle calculation error and automate simple routine tasks such as structure optimization and band structure calculations.

Advanced workflows can be found in the [aiida-user-addons](https://github.com/SMTG-Bham/aiida-user-addons) package, such as those for magnetic configuration enumeration, voltage curve calculation.

<div class="row justify-content-md-center">
    <div class="col-4">
        {% include figure.liquid loading="eager" path="assets/img/acwf-nature-reviews-physics.png" title="AiiDA Common workflow project for DFT cross-validations." class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-5">
        {% include figure.liquid loading="eager" path="assets/img/periodic-table.png" title="Plane wave DFT vs all electron results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I have also developed a package to automate the process of running _ab initio_ random structure searching (AIRSS) and analysing the results.
This package is called [DISP](https://github.com/zhubonan/disp) and is primarily aimed at running large scale searches distributed on multiple computers with flexibility and scalability.
It uses a central database to store workflow data and results (so more like [atomate](https://atomate.org/)).

## Nonlinear optics

NLOTools.jl is a tool for computing linear and non-linear optics properties of materials.
Primarily aimed for use with the CASTEP code but also compatible with VASP.
This code will be open-sourced in the near future.

## EDDP.jl

[EDDP.jl](https://github.com/zhubonan/EDDP.jl) (the package name may change in the near future in compliance with Julia naming conventions) is a Julia implementation of the Ephemeral Data-Driven Potential (EDDP) aim at efficiency and being test beds for further developments.

EDDP is a simple approach to construct machine learning interatomic potential for accelerating crystal structure prediction {% cite salzbrenner_developments_2023 %}.
The atomic environments are described with up to three-body terms with Lennard-Jones inspired expansion terms.
The descriptors are then fed to an ensemble of shallow neural networks for prediction of energy and forces.

This approach is well-integrated with _ab initio_ random structure searching ([AIRSS](https://www.mtg.msm.cam.ac.uk/Codes/AIRSS)).

<div class="row justify-content-md-center">
    <div class="col-5">
        {% include figure.liquid loading="eager" path="assets/img/eddp-paper.png" title="Phase diagram calculated using EDDP for Pb." class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-3">
        {% include figure.liquid loading="eager" path="assets/img/eddp_jl_logo_small.png" title="The Julia EDDP code package." class="img-fluid rounded z-depth-1" %}
    </div>
</div>
