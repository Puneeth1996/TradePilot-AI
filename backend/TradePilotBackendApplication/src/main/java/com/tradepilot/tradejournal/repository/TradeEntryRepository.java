package com.tradepilot.tradejournal.repository;

import com.tradepilot.tradejournal.entity.TradeEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TradeEntryRepository extends JpaRepository<TradeEntry, Long> {
}
