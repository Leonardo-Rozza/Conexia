package com.conexia.service;

import com.conexia.service.dto.ApplicationCreateDTO;
import com.conexia.service.dto.ApplicationDTO;
import com.conexia.service.dto.ApplicationUpdateDTO;

import java.util.List;

public interface ApplicationService {

    ApplicationDTO apply(ApplicationCreateDTO dto);

    List<ApplicationDTO> getByGraduate(Long graduateId);

    List<ApplicationDTO> getByOffer(Long offerId);

    ApplicationDTO updateStatus(Long id, ApplicationUpdateDTO dto);

}
